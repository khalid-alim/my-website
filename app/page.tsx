"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Header } from "@/components/ui/header"

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDarkMode(darkModeMediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
    darkModeMediaQuery.addEventListener("change", handleChange)

    return () => darkModeMediaQuery.removeEventListener("change", handleChange)
  }, [])

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked)
    document.documentElement.classList.toggle("dark", checked)
  }

  return (
    <div
      className={`min-h-screen bg-[#F5F5F3] dark:bg-darkNavy text-foreground transition-colors duration-300 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <main className="mt-16 sm:mt-24 space-y-16">
          <section className="space-y-8">
            <h1 className="text-4xl font-normal tracking-tight">Hi, I'm Khalid.</h1>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>I'm a researcher, programmer, artist, and writer.</p>
              <p>
                Lately, I've been thinking a lot about <span className="subtle-emphasis">legal architectures</span>,{" "}
                <span className="subtle-emphasis">governance entropy</span>,{" "}
                <span className="subtle-emphasis">decision boundaries</span>, and{" "}
                <span className="subtle-emphasis">transitions</span>.
              </p>
              <p>
                Depending on when you're reading this, I'm working on developing frameworks for compute attribution in
                AI systems, examining how technical and legal definitions of computational resource usage can be
                reconciled in ways that are both meaningful and enforceable.
              </p>
              <p>
                Prior to this, I studied politics, philosophy, and economics, where I started exploring the
                intersections of technology, society, and governance.
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
              className="group inline-flex items-center space-x-2 text-base text-foreground transition-all duration-200 hover:text-primary"
            >
              <span className="relative">
                <span className="absolute inset-x-0 bottom-0 h-px bg-muted-foreground/20 transition-colors duration-200 group-hover:bg-primary/20" />
                <span className="relative inline-block pb-1">Browse my writings</span>
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </section>

          <section className="space-y-4">
            <p className="text-sm text-muted-foreground">If what you find interests you, let's talk.</p>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <Link
                href="https://x.com/username"
                className="transition-colors duration-200 hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                X
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
                href="https://cal.com/username"
                className="transition-colors duration-200 hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                Meeting
              </Link>
              <Link href="mailto:hello@example.com" className="transition-colors duration-200 hover:text-foreground">
                Email
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

