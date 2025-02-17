"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Moon, Sun, ArrowUpRight } from "lucide-react"

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDarkMode(darkModeMediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
    darkModeMediaQuery.addEventListener("change", handleChange)

    return () => darkModeMediaQuery.removeEventListener("change", handleChange)
  }, [])

  return (
    <div
      className={`min-h-screen bg-background text-foreground transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}
    >
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="mb-16 flex items-center justify-between">
          <nav className="flex space-x-6 text-sm">
            <Link href="/" className="text-primary transition-colors duration-200">
              home
            </Link>
            <Link href="/cv" className="text-muted-foreground transition-colors duration-200 hover:text-foreground">
              cv
            </Link>
            <Link
              href="/writings"
              className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              writings
            </Link>
            <Link href="/books" className="text-muted-foreground transition-colors duration-200 hover:text-foreground">
              books
            </Link>
          </nav>
          <button
            onClick={() => {
              setIsDarkMode(!isDarkMode)
              document.documentElement.classList.toggle("dark")
            }}
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </header>

        <main className="space-y-16">
          <section className="space-y-8">
            <h1 className="text-3xl font-normal tracking-tight">Hi, I'm Dario.</h1>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>I'm a researcher, programmer, artist, and writer.</p>
              <p>
                Lately, I've been thinking a lot about legal architectures, governance entropy, decision boundaries, and
                transitions.
              </p>
              <p>
                Depending on when you're reading this, I'm working on developing frameworks for compute attribution in
                AI systems, examining how technical and legal definitions of computational resource usage can be
                reconciled in ways that are both meaningful and enforceable.
              </p>
              <p>
                Prior to this, I was a student at the University of Minnesota where I studied politics, philosophy and
                code.
              </p>
              <p>
                Feel free to poke around this website, which serves as a sampling of what I am currently reading,
                writing, and thinking about.
              </p>
            </div>
          </section>

          <section>
            <Link
              href="/writings"
              className="group inline-flex items-center space-x-2 text-base text-foreground transition-colors duration-200 hover:text-primary"
            >
              <span className="border-b border-muted-foreground/20 pb-1 transition-colors duration-200 group-hover:border-primary/20">
                Browse my writings
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </section>

          <section className="space-y-4">
            <p className="text-sm text-muted-foreground">If what you find interests you, let's talk.</p>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <Link
                href="https://twitter.com/username"
                className="transition-colors duration-200 hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </Link>
              <Link
                href="https://github.com/username"
                className="transition-colors duration-200 hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
              <Link
                href="https://read.cv/username"
                className="transition-colors duration-200 hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                CV
              </Link>
              <Link
                href="mailto:email@example.com"
                className="transition-colors duration-200 hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                Email
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

