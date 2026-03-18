export type TechIcon = {
  key: string;
  src: string;
  mode: "inline" | "img";
  color?: string;
  label: {
    pt: string;
    en: string;
  };
  href?: string;
};

export const techIcons: TechIcon[] = [
  {
    key: "laravel",
    src: "/icons/laravel.svg",
    mode: "inline",
    color: "#FF2D20",
    label: { pt: "Laravel", en: "Laravel" },
    href: "https://laravel.com",
  },
  {
    key: "php",
    src: "/icons/php.svg",
    mode: "inline",
    color: "#777BB4",
    label: { pt: "PHP", en: "PHP" },
    href: "https://www.php.net",
  },
  {
    key: "nodejs",
    src: "/icons/nodedotjs.svg",
    mode: "inline",
    color: "#5FA04E",
    label: { pt: "Node.js", en: "Node.js" },
    href: "https://nodejs.org",
  },
  {
    key: "typescript",
    src: "/icons/typescript.svg",
    mode: "inline",
    color: "#3178C6",
    label: { pt: "TypeScript", en: "TypeScript" },
    href: "https://www.typescriptlang.org",
  },
  {
    key: "postgresql",
    src: "/icons/postgresql.svg",
    mode: "inline",
    color: "#4169E1",
    label: { pt: "PostgreSQL", en: "PostgreSQL" },
    href: "https://www.postgresql.org",
  },
  {
    key: "mysql",
    src: "/icons/mysql.svg",
    mode: "inline",
    color: "#4479A1",
    label: { pt: "MySQL", en: "MySQL" },
    href: "https://www.mysql.com",
  },
  {
    key: "docker",
    src: "/icons/docker.svg",
    mode: "inline",
    color: "#2496ED",
    label: { pt: "Docker", en: "Docker" },
    href: "https://www.docker.com",
  },
  {
    key: "githubactions",
    src: "/icons/githubactions.svg",
    mode: "inline",
    color: "#2088FF",
    label: { pt: "GitHub Actions", en: "GitHub Actions" },
    href: "https://docs.github.com/actions",
  },
  {
    key: "linux",
    src: "/icons/linux.svg",
    mode: "inline",
    color: "#FCC624",
    label: { pt: "Linux", en: "Linux" },
    href: "https://ubuntu.com",
  },
  {
    key: "nginx",
    src: "/icons/nginx.svg",
    mode: "inline",
    color: "#009639",
    label: { pt: "Nginx", en: "Nginx" },
    href: "https://nginx.org",
  },
  {
    key: "vue",
    src: "/icons/vuedotjs.svg",
    mode: "inline",
    color: "#4FC08D",
    label: { pt: "Vue.js", en: "Vue.js" },
    href: "https://vuejs.org",
  },
  {
    key: "nextjs",
    src: "/icons/nextdotjs.svg",
    mode: "inline",
    color: "#000000",
    label: { pt: "Next.js", en: "Next.js" },
    href: "https://nextjs.org",
  },
];
