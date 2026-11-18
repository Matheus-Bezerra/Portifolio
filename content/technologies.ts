import type { TechnologyGroup } from "@/types/content";

export const technologiesIntro = {
  title: "Tecnologias que uso",
} as const;

export const technologyGroups: TechnologyGroup[] = [
  {
    id: "interfaces",
    title: "Interfaces e produtos web",
    items: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Tailwind CSS" },
      { name: "TanStack" },
      { name: "Storybook" },
      { name: "Micro-frontends" },
    ],
  },
  {
    id: "backend",
    title: "Back-end e APIs",
    items: [
      { name: "Java" },
      { name: "Spring Boot" },
      { name: "Node.js" },
      { name: "NestJS" },
      { name: "Fastify" },
      { name: "Express" },
      { name: "PHP" },
      { name: "Zend" },
    ],
  },
  {
    id: "apps",
    title: "Aplicativos",
    items: [
      { name: "React Native" },
      { name: "Expo" },
      { name: "Expo Router" },
      { name: "NativeWind" },
    ],
  },
  {
    id: "dados",
    title: "Dados e integrações",
    items: [
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "Oracle" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "Prisma" },
      { name: "JPA" },
      { name: "RabbitMQ" },
      { name: "Kafka" },
      { name: "APIs REST" },
      { name: "Webhooks" },
    ],
  },
  {
    id: "infra",
    title: "Infraestrutura e entrega",
    items: [
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "S3" },
      { name: "GCP" },
      { name: "GitHub" },
      { name: "Bitbucket" },
      { name: "Azure DevOps" },
    ],
  },
];
