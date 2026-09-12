"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-signature ease-signature ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-secondary/30" : "bg-transparent"
      }`}
    >
      <nav className="relative max-w-3xl mx-auto w-full px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="font-mono text-sm text-foreground" onClick={() => setIsOpen(false)}>
          Timothy Sheu
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm text-foreground hover:text-accent transition-colors">
            Home
          </Link>
          <Link href="/#mentions" className="text-sm text-foreground hover:text-accent transition-colors">
            Mentions
          </Link>
          <Link href="/#contact" className="text-sm text-foreground hover:text-accent transition-colors">
            Contact
          </Link>
          <Link
            href="/projects"
            className="text-sm px-4 py-1.5 rounded-full bg-accent text-background font-medium transition-all duration-signature ease-signature hover:scale-[1.03] hover:shadow-[0_0_20px_-8px_var(--accent)]"
          >
            Projects
          </Link>
          <div className="flex items-center gap-4 pl-4 border-l border-secondary/30">
            <a href="https://github.com/timjs42/personal-portfolio-site" target="_blank" rel="noopener noreferrer" aria-label="View source code for this site">
              <svg className="w-5 h-5 text-foreground hover:text-accent transition-colors" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </a>
            <a href="https://github.com/timjs42" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg className="w-5 h-5 text-foreground hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/timothy-sheu/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg className="w-5 h-5 text-foreground hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        <button
          className="md:hidden text-foreground relative w-6 h-6"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="absolute left-0 top-1.5 w-6 h-0.5 bg-current transition-transform duration-signature ease-signature"
            style={{ transform: isOpen ? "translateY(6px) rotate(45deg)" : "none" }}
          />
          <span
            className="absolute left-0 top-3 w-6 h-0.5 bg-current transition-opacity duration-signature ease-signature"
            style={{ opacity: isOpen ? 0 : 1 }}
          />
          <span
            className="absolute left-0 top-[18px] w-6 h-0.5 bg-current transition-transform duration-signature ease-signature"
            style={{ transform: isOpen ? "translateY(-6px) rotate(-45deg)" : "none" }}
          />
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 pt-4 pb-2 animate-[vt-blur-in_var(--duration-signature)_var(--ease-signature)]">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-sm text-foreground hover:text-accent transition-colors">
            Home
          </Link>
          <Link href="/#mentions" onClick={() => setIsOpen(false)} className="text-sm text-foreground hover:text-accent transition-colors">
            Mentions
          </Link>
          <Link href="/#contact" onClick={() => setIsOpen(false)} className="text-sm text-foreground hover:text-accent transition-colors">
            Contact
          </Link>
          <Link
            href="/projects"
            onClick={() => setIsOpen(false)}
            className="self-start text-sm px-4 py-1.5 rounded-full bg-accent text-background font-medium transition-all duration-signature ease-signature hover:scale-[1.03] hover:shadow-[0_0_20px_-8px_var(--accent)]"
          >
            Projects
          </Link>
          <div className="flex items-center gap-4 pt-2 border-t border-secondary/30">
            <a href="https://github.com/timjs42/personal-portfolio-site" target="_blank" rel="noopener noreferrer" aria-label="View source code for this site">
              <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </a>
            <a href="https://github.com/timjs42" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/timothy-sheu/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      )}
      </nav>
    </header>
  );
}
