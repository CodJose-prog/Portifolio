import Link from "next/link";
import type { Lang } from "@/lib/i18n";

type BreadcrumbItem = {
  label: string;
  href: string;
};

type BreadcrumbNavProps = {
  lang: Lang;
  items: BreadcrumbItem[];
};

export function BreadcrumbNav({ lang, items }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="font-medium text-foreground">
                  {item.label}
                </span>
              ) : (
                <Link href={`/${lang}${item.href}`} className="hover:text-foreground">
                  {item.label}
                </Link>
              )}
              {!isLast ? <span>/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
