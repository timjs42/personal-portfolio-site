import Link from "next/link";
import NotFoundGame from "@/components/NotFoundGame";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <div className="flex flex-col items-center gap-3">
        <p className="font-display text-6xl sm:text-7xl font-semibold text-foreground leading-none">
          404
        </p>
        <h1 className="font-display text-xl sm:text-2xl font-semibold text-foreground">
          Page not found
        </h1>
        <p className="text-primary max-w-sm">
          This page doesn&apos;t exist, but you can hang out here for a bit.
        </p>
      </div>

      <NotFoundGame />

      <Link
        href="/"
        className="h-12 px-6 flex items-center justify-center rounded-full bg-accent text-background font-medium transition-all duration-signature ease-signature hover:scale-[1.03] hover:-rotate-1 hover:shadow-[0_0_30px_-8px_var(--accent)]"
      >
        Back home
      </Link>
    </main>
  );
}
