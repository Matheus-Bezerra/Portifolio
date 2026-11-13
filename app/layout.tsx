import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { Providers } from "@/components/motion/Providers";
import { site, siteUrl } from "@/content/site";
import "./globals.css";

/* Só "latin": o português cabe no Latin-1. O latin-ext (92 KB) era pré-carregado sem ser usado. */
const sora = Sora({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  variable: "--font-sora",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  keywords: [
    "Engenheiro de Software",
    "Software Engineer",
    "Full Stack",
    "React",
    "TypeScript",
    "Java",
    "Spring Boot",
    "Node.js",
    "APIs e integrações",
    "Design Systems",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/assets/logo/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/logo/favicon/mb-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/logo/favicon/mb-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/assets/logo/favicon/mb-180.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  /* Metadados não leem variáveis CSS: espelha --color-bg */
  themeColor: "#141414",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${inter.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
