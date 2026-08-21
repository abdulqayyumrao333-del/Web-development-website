import { getGroqClient, GROQ_MODEL, GroqConfigError } from "@/lib/ai/groq";
import { db } from "@/lib/db";
import { siteConfig } from "@/config/site";
import { publishedPostWhere } from "@/lib/blog";

export const runtime = "nodejs";

async function buildSystemPrompt(): Promise<string> {
  let skills: { name: string; category: string }[] = [];
  let experience: { role: string; company: string; description: string; isCurrent: boolean }[] = [];
  let projects: { title: string; summary: string; techStack: string[] }[] = [];
  let services: { title: string; shortDescription: string; techStack: string[]; deliverables: string[] }[] = [];
  let posts: { title: string; excerpt: string; category: string; slug: string }[] = [];

  try {
    [skills, experience, projects, services, posts] = await Promise.all([
      db.skill.findMany({ select: { name: true, category: true } }),
      db.experience.findMany({ select: { role: true, company: true, description: true, isCurrent: true } }),
      db.project.findMany({ where: { visible: true }, select: { title: true, summary: true, techStack: true } }),
      db.service.findMany({ select: { title: true, shortDescription: true, techStack: true, deliverables: true } }),
      db.blogPost.findMany({ where: publishedPostWhere, select: { title: true, excerpt: true, category: true, slug: true } }),
    ]);
  } catch {
    // Database not configured yet — the assistant still works, just with an
    // empty knowledge base, and will correctly say it doesn't have details.
  }

  return `You are the AI assistant embedded in Abdul Qayyum's personal portfolio website.

Your ONLY source of truth is the verified information below. Do not invent, guess, or
embellish anything about Abdul's skills, experience, projects, services, or availability —
if a visitor asks something this data doesn't cover, say plainly that you don't have that
information and suggest they contact Abdul directly at ${siteConfig.links.email} or via
the contact page.

Never state or imply metrics, client names, revenue, employment dates, pricing, or
outcomes that are not explicitly listed here. If asked for a price or quote, explain that
pricing depends on project scope and direct them to the contact page — never estimate a number.

When someone describes a project idea or asks which service fits their needs, actively help
them narrow it down using the SERVICES list below — ask a clarifying question if genuinely
unclear, then name the specific service and suggest they mention that project type when they
fill out the contact form (the form's project-type field will show relevant follow-up
questions automatically). Don't just list all services back at them.

=== SKILLS ===
${skills.length ? skills.map((s) => `- ${s.name} (${s.category})`).join("\n") : "(none published yet)"}

=== EXPERIENCE ===
${experience.length ? experience.map((e) => `- ${e.role} at ${e.company}${e.isCurrent ? " (current)" : ""}: ${e.description}`).join("\n") : "(none published yet)"}

=== PROJECTS ===
${projects.length ? projects.map((p) => `- ${p.title}: ${p.summary} [${p.techStack.join(", ")}]`).join("\n") : "(none published yet)"}

=== SERVICES (what Abdul can build) ===
${services.length ? services.map((s) => `- ${s.title}: ${s.shortDescription} | Stack: ${s.techStack.join(", ") || "not specified"} | Delivers: ${s.deliverables.join(", ") || "not specified"}`).join("\n") : "(none published yet)"}

=== BLOG POSTS ===
${posts.length ? posts.map((p) => `- "${p.title}" (${p.category}, /blog/${p.slug}): ${p.excerpt}`).join("\n") : "(none published yet)"}

=== DEVELOPMENT PROCESS ===
Discovery → Planning → UI/UX Design → Development → Testing → Deployment → Ongoing Support.
This is the same process for every engagement regardless of service type.

=== CONTACT ===
Email: ${siteConfig.links.email}
WhatsApp: ${siteConfig.links.whatsapp}
GitHub: ${siteConfig.links.github}
LinkedIn: ${siteConfig.links.linkedin}

Keep responses concise and conversational — this is a chat widget, not an essay.`;
}

export async function POST(request: Request) {
  let client;
  try {
    client = getGroqClient();
  } catch (err) {
    if (err instanceof GroqConfigError) {
      return new Response(
        "Ask Abdul's AI isn't configured yet — set GROQ_API_KEY to enable it.",
        { status: 503 }
      );
    }
    throw err;
  }

  const { messages } = (await request.json()) as {
    messages: { role: "user" | "assistant"; content: string }[];
  };

  const system = await buildSystemPrompt();

  const stream = await client.chat.completions.create({
    model: GROQ_MODEL,
    max_tokens: 1024,
    stream: true,
    messages: [{ role: "system", content: system }, ...messages],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(readable, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
