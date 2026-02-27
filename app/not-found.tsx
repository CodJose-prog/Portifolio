import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="mb-3 rounded-full border border-border bg-muted px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        404
      </p>
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        The page you requested does not exist in this portfolio.
      </p>
      <Button asChild className="mt-6">
        <Link href="/pt">Go to homepage</Link>
      </Button>
    </main>
  );
}
