export default function Footer() {
  return (
    <footer className="border-t border-secondary/30 px-6 py-8">
      <div className="max-w-3xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary">
        <p>© {new Date().getFullYear()} Timothy Sheu</p>
        <a
          href="https://github.com/timjs42/personal-portfolio-site"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors"
        >
          See the code for this site →
        </a>
      </div>
    </footer>
  );
}
