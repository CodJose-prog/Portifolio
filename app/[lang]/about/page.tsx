import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { certifications, education } from "@/content/experience";
import { profile } from "@/content/profile";
import { isValidLang } from "@/lib/i18n";
import { buildPageMetadata, generateStructuredData } from "@/lib/seo";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { JsonLd } from "@/components/json-ld";
import { MotionFade } from "@/components/motion-fade";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AboutPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) {
    return {};
  }

  const dictionary = getDictionary(lang);
  return buildPageMetadata({
    lang,
    route: "/about",
    title: dictionary.about.h1,
    description: dictionary.about.intro,
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) {
    notFound();
  }

  const dictionary = getDictionary(lang);

  return (
    <article className="space-y-8">
      <JsonLd
        data={generateStructuredData(lang, {
          page: "about",
          breadcrumb: [
            { name: dictionary.breadcrumbs.home, path: "" },
            { name: dictionary.breadcrumbs.about, path: "/about" },
          ],
        })}
      />

      <BreadcrumbNav
        lang={lang}
        items={[
          { label: dictionary.breadcrumbs.home, href: "" },
          { label: dictionary.breadcrumbs.about, href: "/about" },
        ]}
      />

      <MotionFade>
        <section className="section-shell surface grid gap-6 rounded-[2rem] border border-border/70 p-6 lg:grid-cols-[0.82fr_1.18fr] lg:p-8">
          <div className="overflow-hidden rounded-[1.75rem] border border-border/70">
            <Image
              src="/profile/jose-manoel.jpg"
              alt="José Manoel Pereira - Backend Engineer"
              width={520}
              height={580}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="space-y-5">
            <p className="soft-label">{dictionary.about.trajectoryTitle}</p>
            <h1 className="text-4xl font-semibold">{dictionary.about.h1}</h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              {dictionary.about.intro}
            </p>
            <div className="space-y-4 text-base leading-8 text-muted-foreground">
              <p>{profile.trajectory.intro[lang]}</p>
              {profile.trajectory.paragraphs[lang].map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      </MotionFade>

      <MotionFade delay={0.04}>
        <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <Card className="rounded-[1.75rem]">
            <CardHeader>
              <CardTitle>{dictionary.about.focusTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {profile.trajectory.currentFocus[lang].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border/70 bg-background/55 px-4 py-4 text-sm leading-7 text-muted-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[1.75rem]">
            <CardHeader>
              <CardTitle>{dictionary.home.differentiatorsTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.differentiators.map((item) => (
                <div
                  key={item.title[lang]}
                  className="rounded-2xl border border-border/70 bg-background/55 p-4"
                >
                  <h2 className="text-base font-semibold">{item.title[lang]}</h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {item.description[lang]}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </MotionFade>

      <MotionFade delay={0.06}>
        <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <Card className="rounded-[1.75rem]">
            <CardHeader>
              <CardTitle>{dictionary.about.educationTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {education.map((item) => (
                <div
                  key={`${item.institution}-${item.completion}`}
                  className="rounded-2xl border border-border/70 bg-background/55 p-4"
                >
                  <h2 className="text-base font-semibold">{item.degree[lang]}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{item.institution}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {lang === "pt" ? "Conclusão" : "Completion"}: {item.completion[lang]}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[1.75rem]">
            <CardHeader>
              <CardTitle>{dictionary.about.certificationsTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3 text-sm leading-7 text-muted-foreground">
                {certifications.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-2xl border border-border/70 bg-background/55 px-4 py-3"
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </MotionFade>
    </article>
  );
}
