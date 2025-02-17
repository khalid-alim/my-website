"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Moon, Sun, Calendar, BookOpen, ArrowUpRight } from "lucide-react"

type WritingItem = {
  title: string
  href: string
  abstract?: string
  lastUpdated: string
  references: number
  backlinks: number
}

const writings: Record<string, WritingItem[]> = {
  Essays: [
    {
      title: "The Future of AI Systems",
      href: "/essays/ai-systems",
      abstract: "An exploration of the technical challenges and opportunities in building safe, interpretable AI",
      lastUpdated: "2024-02-15",
      references: 42,
      backlinks: 17,
    },
    {
      title: "Machine Learning: Beyond the Basics",
      href: "/essays/machine-learning",
      abstract: "Deep dive into advanced machine learning concepts and their practical applications",
      lastUpdated: "2024-01-30",
      references: 38,
      backlinks: 23,
    },
  ],
  "Technical Notes": [
    {
      title: "Reinforcement Learning from Human Feedback",
      href: "/notes/reinforcement-learning",
      abstract: "Key insights and recent developments in RLHF",
      lastUpdated: "2024-02-10",
      references: 15,
      backlinks: 8,
    },
    {
      title: "Large Language Model Architecture",
      href: "/notes/language-models",
      abstract: "Exploring the latest advancements in LLM design",
      lastUpdated: "2024-01-25",
      references: 22,
      backlinks: 11,
    },
    {
      title: "Recent Developments in AI Safety",
      href: "/notes/ai-safety",
      abstract: "A comprehensive overview of AI safety research",
      lastUpdated: "2023-12-15",
      references: 30,
      backlinks: 19,
    },
  ],
  "Research Papers": [
    {
      title: "Constitutional AI: A Framework for Reliable Systems",
      href: "/papers/constitutional-ai",
      abstract: "Proposing a novel approach to ensure AI system reliability and safety",
      lastUpdated: "2024-01-15",
      references: 56,
      backlinks: 28,
    },
    {
      title: "Advances in Neural Network Interpretability",
      href: "/papers/interpretability",
      abstract: "New techniques for understanding and explaining neural network decisions",
      lastUpdated: "2023-12-01",
      references: 47,
      backlinks: 35,
    },
  ],
  "Short Posts": [
    {
      title: "AI Regulation and Export Controls",
      href: "/posts/ai-regulation",
      abstract: "Analyzing the impact of recent regulatory changes on AI development",
      lastUpdated: "2024-02-05",
      references: 12,
      backlinks: 7,
    },
    {
      title: "Building Reliable ML Infrastructure",
      href: "/posts/ml-infrastructure",
      abstract: "Best practices for scalable and maintainable machine learning systems",
      lastUpdated: "2024-01-20",
      references: 18,
      backlinks: 13,
    },
    {
      title: "The Path Forward for AI Development",
      href: "/posts/future-ai",
      abstract: "Exploring the future directions of AI research and applications",
      lastUpdated: "2023-12-10",
      references: 25,
      backlinks: 20,
    },
  ],
}

export default function Writings() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDarkMode(darkModeMediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
    darkModeMediaQuery.addEventListener("change", handleChange)

    return () => darkModeMediaQuery.removeEventListener("change", handleChange)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div
      className={`min-h-screen bg-background text-foreground transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <header className="mb-16 flex items-center justify-between">
          <h1 className="text-3xl font-normal tracking-tight">Writings</h1>
          <button
            onClick={toggleDarkMode}
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </header>

        <main className="space-y-20">
          {Object.entries(writings).map(([category, items]) => (
            <WritingSection key={category} title={category} items={items} />
          ))}
        </main>

        <footer className="mt-20 space-y-4 text-sm">
          <Link
            href="/"
            className="inline-block text-muted-foreground transition-colors duration-200 hover:text-foreground focus:outline-none focus-visible:text-foreground"
            tabIndex={0}
          >
            ← Back home
          </Link>
          <div>
            <Link
              href="/subscribe"
              className="text-foreground transition-colors duration-200 hover:text-primary focus:outline-none focus-visible:text-primary"
              tabIndex={0}
            >
              Subscribe
            </Link>
            {" for email alerts about new posts."}
          </div>
        </footer>
      </div>
    </div>
  )
}

function WritingSection({ title, items }: { title: string; items: WritingItem[] }) {
  return (
    <section className="grid grid-cols-[1fr_2fr_1fr] gap-4">
      <div className="col-start-2">
        <h2 className="mb-6 text-lg font-medium">{title}</h2>
      </div>
      <div className="col-span-3 space-y-8">
        {items.map((item, index) => (
          <WritingItem key={index} item={item} />
        ))}
      </div>
    </section>
  )
}

function WritingItem({ item }: { item: WritingItem }) {
  return (
    <article className="group relative grid grid-cols-[1fr_2fr_1fr] gap-4 items-start">
      <div className="text-sm text-muted-foreground/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="transition-all duration-300 group-hover:translate-x-0 -translate-x-4">{item.abstract}</p>
      </div>
      <Link href={item.href} className="block focus:outline-none" tabIndex={0}>
        <h3 className="text-xl font-normal leading-snug transition-colors duration-200 group-hover:text-primary group-focus-visible:text-primary border-b border-muted-foreground/20 inline-block pb-1">
          {item.title}
        </h3>
      </Link>
      <div className="text-right text-xs text-muted-foreground/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="space-y-2">
          <div className="flex items-center justify-end space-x-1 transition-all duration-300 group-hover:translate-x-0 translate-x-4">
            <Calendar className="h-3 w-3" />
            <span>{item.lastUpdated}</span>
          </div>
          <div className="flex items-center justify-end space-x-1 transition-all duration-300 delay-75 group-hover:translate-x-0 translate-x-4">
            <BookOpen className="h-3 w-3" />
            <span>{item.references}</span>
          </div>
          <div className="flex items-center justify-end space-x-1 transition-all duration-300 delay-150 group-hover:translate-x-0 translate-x-4">
            <ArrowUpRight className="h-3 w-3" />
            <span>{item.backlinks}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

