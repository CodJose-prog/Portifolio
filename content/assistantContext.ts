import { siteConfig } from "@/lib/site";

export const assistantContext = {
  pt: `
Perfil:
- Nome: José Manoel Pereira.
- Cargo principal: Desenvolvedor Full Stack / Engenheiro de Software.
- Localização: Santarém, PA - Brasil.

Contato:
- WhatsApp: ${siteConfig.whatsapp}
- LinkedIn: ${siteConfig.linkedin}
- GitHub: ${siteConfig.github}
- Instagram: ${siteConfig.instagram}

Experiência (ordem cronológica descendente):
1) ArenaCalendar (SaaS próprio) - Engenheiro de Software & Líder Técnico - Jan 2026 até o momento.
   Responsabilidades: liderança end-to-end do produto, arquitetura SaaS multi-tenant, DevOps em VPS Linux, automação de deploy via Git, monitoramento de servidores, isolamento de dados com PostgreSQL RLS.
2) MAVIK (Agência de Software) - Desenvolvedor Full Stack & Consultor de Soluções - Nov 2025 até o momento.
   Responsabilidades: soluções web para múltiplos clientes, foco em Core Web Vitals, SEO técnico, definição de stack Next.js + TypeScript, padrões para escalabilidade.
3) Silva & Souza Tecnologia - Desenvolvedor Full Stack (Projeto de Modernização) - Out 2025 a Nov 2025.
   Responsabilidades: migração de Blade para SPA com Vue.js + Inertia + TypeScript, branch switcher, reestruturação de acesso com middleware, privatização de rotas e segurança Laravel, MySQL centralizado.
4) Barbearia KLP - Desenvolvedor Full Stack (Contrato PJ) - Mar 2025 a Mai 2025.
   Responsabilidades: ERP customizado, automação de processos manuais, modelagem de banco, padrão MVC.
5) VA Imports (E-commerce) - Desenvolvedor Backend (Sustentação) - Ago 2024 a Dez 2024.
   Responsabilidades: manutenção de infraestrutura produtiva, correções de segurança, otimização SQL, suporte a picos de tráfego.

Competências técnicas:
- Backend e linguagens: PHP 8+ (Laravel), JavaScript (Node.js), TypeScript, Java, Python (automação/IA).
- Frontend: Vue.js (Inertia, Composition API), React/Next.js, Tailwind CSS.
- DevOps e infraestrutura: Docker, CI/CD com GitHub Actions, Linux (Ubuntu/Debian), Nginx/Apache, gestão de VPS.
- Banco de dados: PostgreSQL (otimização e RLS), MySQL, modelagem relacional.

Formação:
- Análise e Desenvolvimento de Sistemas - UNAMA - Conclusão 2025.
- Técnico em Desenvolvimento de Sistemas - IFPA - Conclusão 2023.

Certificações e comunidade:
- Maratona SBC de Programação - Fase Zero.
- Java Foundations Certified Junior Associate (Preparatório) - Oracle Academy.
- Desenvolvimento Web Moderno com PHP - Udemy.
- Microservices Architecture with Golang - Workshop UNAMA.
- AI & Machine Learning Concepts - Workshop Técnico.
`.trim(),
  en: `
Profile:
- Name: José Manoel Pereira.
- Main role: Full Stack Developer / Software Engineer.
- Location: Santarém, PA - Brazil.

Contact:
- WhatsApp: ${siteConfig.whatsapp}
- LinkedIn: ${siteConfig.linkedin}
- GitHub: ${siteConfig.github}
- Instagram: ${siteConfig.instagram}

Experience (descending chronological order):
1) ArenaCalendar (own SaaS) - Software Engineer & Tech Lead - Jan 2026 to present.
   Responsibilities: end-to-end product leadership, scalable multi-tenant SaaS architecture, Linux VPS DevOps, Git-based deploy automation, server monitoring, data isolation with PostgreSQL RLS.
2) MAVIK (software agency) - Full Stack Developer & Solutions Consultant - Nov 2025 to present.
   Responsibilities: web solutions for multiple clients, Core Web Vitals focus, technical SEO, stack definition with Next.js + TypeScript, scalable project standards.
3) Silva & Souza Tecnologia - Full Stack Developer (Modernization Project) - Oct 2025 to Nov 2025.
   Responsibilities: Blade-to-SPA migration with Vue.js + Inertia + TypeScript, branch switcher, middleware access control restructuring, private routes and Laravel security hardening, centralized MySQL.
4) Barbearia KLP - Full Stack Developer (PJ contract) - Mar 2025 to May 2025.
   Responsibilities: custom ERP development, manual-process automation, database modeling, MVC pattern.
5) VA Imports (e-commerce) - Backend Developer (Maintenance) - Aug 2024 to Dec 2024.
   Responsibilities: production infrastructure maintenance, security fixes, SQL query optimization, high-traffic support.

Technical skills:
- Backend and languages: PHP 8+ (Laravel), JavaScript (Node.js), TypeScript, Java, Python (automation/AI).
- Frontend: Vue.js (Inertia, Composition API), React/Next.js, Tailwind CSS.
- DevOps and infrastructure: Docker, CI/CD with GitHub Actions, Linux (Ubuntu/Debian), Nginx/Apache, VPS management.
- Databases: PostgreSQL (optimization and RLS), MySQL, relational modeling.

Education:
- Systems Analysis and Development - UNAMA - Graduated in 2025.
- Technical Degree in Systems Development - IFPA - Graduated in 2023.

Certifications and community:
- SBC Programming Marathon - Zero Phase.
- Java Foundations Certified Junior Associate (Preparatory) - Oracle Academy.
- Modern Web Development with PHP - Udemy.
- Microservices Architecture with Golang - UNAMA workshop.
- AI & Machine Learning Concepts - Technical workshop.
`.trim(),
} as const;
