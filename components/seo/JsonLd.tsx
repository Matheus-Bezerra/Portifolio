import { social } from "@/content/contact";
import { site, siteUrl } from "@/content/site";

/** Dados estruturados (schema.org Person + WebSite). */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#pessoa`,
        name: site.name,
        jobTitle: site.jobTitle,
        description: site.description,
        url: siteUrl,
        image: `${siteUrl}${site.portrait.src}`,
        email: `mailto:${social.email}`,
        sameAs: [social.linkedin, social.github],
        knowsAbout: site.knowsAbout,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#site`,
        url: siteUrl,
        name: site.title,
        inLanguage: "pt-BR",
        publisher: { "@id": `${siteUrl}/#pessoa` },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // Conteúdo estático e controlado (sem dados do usuário)
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
