import type { Lang } from "@/lib/i18n";
import type { TerminalEffect } from "@/content/terminal";

export const publicResumeAssetPath = "/downloads/Jose-Manoel-Resume.pdf";

export function getResumeDownloadEffect(lang: Lang): TerminalEffect {
  return {
    kind: "download",
    href: publicResumeAssetPath,
    filename: lang === "pt" ? "Jose-Manoel-Curriculo.pdf" : "Jose-Manoel-Resume.pdf",
  };
}

export function runTerminalEffect(effect: TerminalEffect) {
  switch (effect.kind) {
    case "download": {
      const anchor = document.createElement("a");
      anchor.href = effect.href;
      anchor.download = effect.filename;
      anchor.rel = "noopener noreferrer";
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      break;
    }
  }
}
