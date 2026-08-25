export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 relative">
      <div className="absolute top-16 left-8 w-16 h-16 rounded-full bg-accent" />
      <div className="absolute bottom-20 right-10 w-10 h-10 rounded-lg bg-ink rotate-12" />
      <div className="flex flex-col items-center gap-6 text-center max-w-xl">
        <p className="font-mono text-sm text-ink-secondary">Hi, I'm Timothy Sheu</p>

        <h1 className="text-4xl sm:text-5xl font-semibold text-ink leading-tight">
          Full-stack developer building things that work.
        </h1>

        <p className="text-lg text-ink-secondary max-w-md">
          [Placeholder bio]
        </p>

        <a href="#projects" className="mt-4 h-12 px-6 flex items-center justify-center rounded-full bg-ink text-paper font-medium transition-transform duration-200 hover:scale-105 hover:-rotate-2">
          See my projects
        </a>
      </div>
    </main>
  );
}