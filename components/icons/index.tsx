import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 18, strokeWidth = 2, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

export const ArrowDown = (p: IconProps) => (
  <Icon strokeWidth={1.8} {...p}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </Icon>
);

export const ArrowUp = (p: IconProps) => (
  <Icon strokeWidth={1.8} {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Icon>
);

export const ChevronDown = (p: IconProps) => (
  <Icon strokeWidth={1.8} {...p}>
    <path d="M6 9l6 6 6-6" />
  </Icon>
);

export const MenuIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);

export const CloseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Icon>
);

/* Ícones genéricos de código do hero (sem marcas de tecnologia) */
export const CodeBrackets = (p: IconProps) => (
  <Icon strokeWidth={1.8} {...p}>
    <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
  </Icon>
);

export const Terminal = (p: IconProps) => (
  <Icon strokeWidth={1.8} {...p}>
    <path d="M4 6l6 6-6 6M12 19h8" />
  </Icon>
);

export const CurlyBraces = (p: IconProps) => (
  <Icon strokeWidth={1.8} {...p}>
    <path d="M8 4c-2 0-3 1-3 3v2c0 1.5-1 2.5-2 3 1 .5 2 1.5 2 3v2c0 2 1 3 3 3M16 4c2 0 3 1 3 3v2c0 1.5 1 2.5 2 3-1 .5-2 1.5-2 3v2c0 2-1 3-3 3" />
  </Icon>
);

export const GitBranch = (p: IconProps) => (
  <Icon strokeWidth={1.8} {...p}>
    <circle cx="6" cy="6" r="2.2" />
    <circle cx="6" cy="18" r="2.2" />
    <circle cx="18" cy="8" r="2.2" />
    <path d="M6 8.2v7.6M18 10.2c0 4-6 3-11 6" />
  </Icon>
);

/* Ícones genéricos dos contatos */
export const Mail = (p: IconProps) => (
  <Icon strokeWidth={1.8} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </Icon>
);

export const Chat = (p: IconProps) => (
  <Icon strokeWidth={1.8} {...p}>
    <path d="M20 12a8 8 0 01-11.6 7.1L4 20l1-4.2A8 8 0 1120 12z" />
  </Icon>
);

export const Person = (p: IconProps) => (
  <Icon strokeWidth={1.8} {...p}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c1.2-3.6 4-5 7-5s5.8 1.4 7 5" />
  </Icon>
);

/**
 * Marca oficial do GitHub (o "Invertocat"). Diferente dos demais ícones, que são de traço,
 * a marca é preenchida: segue a cor do texto (`currentColor`).
 */
export const GitHub = ({ size = 18, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);
