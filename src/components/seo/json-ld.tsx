import { siteConfig } from "@/config/site";
import type { Project, BlogPost, Service } from "@prisma/client";

export function buildPersonJsonLdData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: "Full Stack & AI Developer",
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.fiverr],
  };
}

export function PersonJsonLd() {
  const data = buildPersonJsonLdData();
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function buildWebsiteJsonLdData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function WebsiteJsonLd() {
  const data = buildWebsiteJsonLdData();
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function ProjectJsonLd({ project }: { project: Project }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    image: project.coverImage,
    author: { "@type": "Person", name: siteConfig.name },
    ...(project.techStack.length > 0 && { keywords: project.techStack.join(", ") }),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function SoftwareSourceCodeJsonLd({ project }: { project: Project }) {
  if (!project.githubUrl) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.summary,
    codeRepository: project.githubUrl,
    programmingLanguage: project.techStack,
    author: { "@type": "Person", name: siteConfig.name },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function ServiceListJsonLd({ services }: { services: Service[] }) {
  if (services.length === 0) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, i) => ({
      "@type": "Service",
      position: i + 1,
      name: service.title,
      description: service.shortDescription,
      provider: { "@type": "Person", name: siteConfig.name },
      areaServed: "Worldwide",
      url: `${siteConfig.url}/services#${service.slug}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function buildArticleJsonLdData(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Person", name: siteConfig.name },
  };
}

export function ArticleJsonLd({ post }: { post: BlogPost }) {
  const data = buildArticleJsonLdData(post);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function buildBreadcrumbJsonLdData(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  const data = buildBreadcrumbJsonLdData(items);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function WebPageJsonLd({ title, description, path }: { title: string; description: string; path: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${siteConfig.url}${path}`,
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function FaqJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function ContactPageJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${siteConfig.name}`,
    url: `${siteConfig.url}/contact`,
    about: { "@type": "Person", name: siteConfig.name, email: siteConfig.links.email },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
