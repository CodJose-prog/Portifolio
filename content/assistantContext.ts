import { siteConfig } from "@/lib/site";

export const assistantContext = {
  pt: `
Perfil:
- Nome: JosÃ© Manoel Pereira.
- Cargo principal: Desenvolvedor Full Stack / Engenheiro de Software.
- LocalizaÃ§Ã£o: SantarÃ©m, PA - Brasil.

Contato:
- WhatsApp: ${siteConfig.whatsapp}
- LinkedIn: ${siteConfig.linkedin}
- GitHub: ${siteConfig.github}
- Instagram: ${siteConfig.instagram}

ExperiÃªncia (ordem cronolÃ³gica descendente):
1) ArenaCalendar (SaaS prÃ³prio) - Engenheiro de Software & LÃ­der TÃ©cnico - Jan 2026 atÃ© o momento.
   Responsabilidades: lideranÃ§a end-to-end do produto, arquitetura SaaS multi-tenant, DevOps em VPS Linux, automaÃ§Ã£o de deploy via Git, monitoramento de servidores, isolamento de dados com PostgreSQL RLS.
2) MAVIK (AgÃªncia de Software) - Desenvolvedor Full Stack & Consultor de SoluÃ§Ãµes - Nov 2025 atÃ© o momento.
   Responsabilidades: soluÃ§Ãµes web para mÃºltiplos clientes, foco em Core Web Vitals, SEO tÃ©cnico, definiÃ§Ã£o de stack Next.js + TypeScript, padrÃµes para escalabilidade.
3) Silva & Souza Tecnologia - Desenvolvedor Full Stack (Projeto de ModernizaÃ§Ã£o) - Out 2025 a Nov 2025.
   Responsabilidades: migraÃ§Ã£o de Blade para SPA com Vue.js + Inertia + TypeScript, branch switcher, reestruturaÃ§Ã£o de acesso com middleware, privatizaÃ§Ã£o de rotas e seguranÃ§a Laravel, MySQL centralizado.
4) Barbearia KLP - Desenvolvedor Full Stack (Contrato PJ) - Mar 2025 a Mai 2025.
   Responsabilidades: ERP customizado, automaÃ§Ã£o de processos manuais, modelagem de banco, padrÃ£o MVC.
5) VA Imports (E-commerce) - Desenvolvedor Backend (SustentaÃ§Ã£o) - Ago 2024 a Dez 2024.
   Responsabilidades: manutenÃ§Ã£o de infraestrutura produtiva, correÃ§Ãµes de seguranÃ§a, otimizaÃ§Ã£o SQL, suporte a picos de trÃ¡fego.

CompetÃªncias tÃ©cnicas:
- Backend e linguagens: PHP 8+ (Laravel), JavaScript (Node.js), TypeScript, Java, Python (automaÃ§Ã£o/IA).
- Frontend: Vue.js (Inertia, Composition API), React/Next.js, Tailwind CSS.
- Inclui experiência no desenvolvimento de aplicações mobile para Android e iOS, utilizando stacks modernas quando necessário, integrando APIs e backends próprios.
- DevOps e infraestrutura: Docker, CI/CD com GitHub Actions, Linux (Ubuntu/Debian), Nginx/Apache, gestÃ£o de VPS.
- Banco de dados: PostgreSQL (otimizaÃ§Ã£o e RLS), MySQL, modelagem relacional.

FormaÃ§Ã£o:
- AnÃ¡lise e Desenvolvimento de Sistemas - UNAMA - ConclusÃ£o 2025.
- TÃ©cnico em Desenvolvimento de Sistemas - IFPA - ConclusÃ£o 2023.

CertificaÃ§Ãµes e comunidade:
- Maratona SBC de ProgramaÃ§Ã£o - Fase Zero.
- Java Foundations Certified Junior Associate (PreparatÃ³rio) - Oracle Academy.
- Desenvolvimento Web Moderno com PHP - Udemy.
- Microservices Architecture with Golang - Workshop UNAMA.
- AI & Machine Learning Concepts - Workshop TÃ©cnico.
`.trim(),
  en: `
Profile:
- Name: JosÃ© Manoel Pereira.
- Main role: Full Stack Developer / Software Engineer.
- Location: SantarÃ©m, PA - Brazil.

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
- He also develops mobile applications for Android and iOS when required, integrating them with custom APIs and backend systems.
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


