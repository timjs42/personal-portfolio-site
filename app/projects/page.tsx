import { Suspense } from "react";
import ProjectBrowser, { ProjectBrowserFallback } from "@/components/ProjectBrowser";

export default function Projects() {
  return (
    <main className="flex-1 px-6 py-16 max-w-6xl mx-auto w-full">
      {/* useSearchParams needs a Suspense boundary so the page can still be
          prerendered; the fallback is the unfiltered list. */}
      <Suspense fallback={<ProjectBrowserFallback />}>
        <ProjectBrowser />
      </Suspense>
    </main>
  );
}
