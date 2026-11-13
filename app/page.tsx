import { IntroLoader } from "@/components/intro/IntroLoader";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ReadingProgress } from "@/components/layout/ReadingProgress";
import { About } from "@/components/sections/about/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/hero/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Technologies } from "@/components/sections/Technologies";
import { Work } from "@/components/sections/work/Work";
import { CursorDot } from "@/components/motion/CursorDot";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";

const NO_JS_CSS = [
  ".intro{display:none}",
  '[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important}',
  '[style*="translateY("],[style*="translateX("],[style*="scale("]{transform:none!important}',
  '[style*="blur("]{filter:none!important}',
  "h2 .opacity-0{opacity:1!important}",
].join("");

export default function HomePage() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only-focusable fixed top-3 left-3 z-70 rounded-full bg-text px-5 py-3 text-[14px] font-semibold text-bg"
      >
        Ir para o conteúdo
      </a>

      <IntroLoader />
      {/* Sem JavaScript nada anima: a abertura some e o conteúdo que nasce oculto aparece */}
      <noscript>
        <style>{NO_JS_CSS}</style>
      </noscript>

      <CursorDot />

      <ReadingProgress />

      <Header />

      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Services />
        <Process />
        <Experience />
        <Technologies />
        <Work />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <JsonLd />
    </>
  );
}
