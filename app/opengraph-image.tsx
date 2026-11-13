import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/* O gerador de imagem não lê variáveis CSS: as cores abaixo espelham os tokens de app/globals.css. */
export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagem de compartilhamento gerada no build: assinatura oficial (PNG do pacote
 * da marca) sobre o grafite, com a composição circular da abertura.
 */
export default async function OpengraphImage() {
  const logo = await readFile(
    join(process.cwd(), "public/assets/logo/png/assinatura-fundo-escuro.png"),
    "base64",
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 96px",
        background: "#141414",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -120,
          top: 45,
          width: 540,
          height: 540,
          borderRadius: 9999,
          border: "2px solid #FF853D",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -10,
          top: 155,
          width: 320,
          height: 320,
          borderRadius: 9999,
          background: "radial-gradient(circle, rgba(255,133,61,.22), rgba(255,133,61,0) 70%)",
          display: "flex",
        }}
      />
      <img src={`data:image/png;base64,${logo}`} alt="" width={472} height={80} />
      <div
        style={{
          marginTop: 48,
          display: "flex",
          alignItems: "center",
          gap: 16,
          color: "#B7B3AD",
          fontSize: 22,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        <div style={{ width: 40, height: 3, background: "#FF853D", display: "flex" }} />
        {site.jobTitle}
      </div>
      <div
        style={{ marginTop: 20, color: "#F5F2ED", fontSize: 44, maxWidth: 600, lineHeight: 1.2 }}
      >
        {site.tagline}
      </div>
    </div>,
    size,
  );
}
