import Image from "next/image";
import type { ProjectImage } from "@/types/content";
import { cn } from "@/lib/utils";

interface ProjectMediaProps {
  name: string;
  image?: ProjectImage;
  sizes: string;
  className?: string;
}

/**
 * Capa do projeto. Enquanto a capa oficial não existir em public/assets/projects,
 * mostra uma moldura neutra nas mesmas proporções — sem conteúdo inventado.
 */
export function ProjectMedia({ name, image, sizes, className }: ProjectMediaProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-media", className)}>
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 ease-(--ease-standard) group-focus-within:scale-[1.02] group-hover:scale-[1.02] motion-reduce:transition-none"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center border border-line bg-linear-to-b from-surface-deep to-surface-sunk"
        >
          <span className="px-3 text-center font-display text-[13px] font-semibold tracking-[-0.01em] text-text-3 md:text-[15px]">
            {name}
          </span>
        </div>
      )}
    </div>
  );
}
