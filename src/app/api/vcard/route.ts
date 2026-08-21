import { siteConfig } from "@/config/site";

export async function GET() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:Qayyum;Abdul;;;`,
    `FN:${siteConfig.name}`,
    "TITLE:Full Stack Developer & AI Developer",
    `EMAIL;TYPE=INTERNET:${siteConfig.links.email}`,
    `TEL;TYPE=CELL:+923294935619`,
    `URL:${siteConfig.url}`,
    `URL:${siteConfig.links.github}`,
    `URL:${siteConfig.links.linkedin}`,
    "END:VCARD",
  ].join("\r\n");

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="abdul-qayyum.vcf"',
    },
  });
}
