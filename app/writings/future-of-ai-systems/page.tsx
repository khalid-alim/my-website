"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Moon, Sun, ArrowLeft } from "lucide-react"

type Sidenote = {
  id: string
  content: string
  type: "annotation" | "reference"
}

const metadata = {
  title: "The Future of AI Systems",
  author: "Dario Amodei",
  date: "2024-02-16",
  status: "Draft",
  confidence: "High",
  importance: "8/10",
  wordCount: "2,500",
  lastUpdated: "2024-02-16",
}

const sidenotes: Record<string, Sidenote> = {
  "note-1": {
    id: "note-1",
    content:
      "This builds on earlier work in constitutional AI, particularly the frameworks developed at Anthropic in 2023.",
    type: "annotation",
  },
  "note-2": {
    id: "note-2",
    content:
      "The term 'steerable' here refers to the ability to reliably direct AI system behavior within defined parameters.",
    type: "annotation",
  },
  "ref-1": {
    id: "ref-1",
    content: "Amodei et al. (2023). Constitutional AI: A Framework for Reliable Systems. Nature Machine Intelligence.",
    type: "reference",
  },
  "ref-2": {
    id: "ref-2",
    content: "Smith, J. & Johnson, M. (2024). Advances in Neural Network Interpretability. NeurIPS 2024.",
    type: "reference",
  },
}

export default function Essay() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeNote, setActiveNote] = useState<string | null>(null)

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
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="mb-16 flex items-center justify-between">
          <Link
            href="/writings"
            className="inline-flex items-center space-x-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to writings</span>
          </Link>
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

        <article className="relative grid grid-cols-[1fr_2fr_1fr] gap-16">
          {/* Left Column - Annotations */}
          <div className="relative text-right">
            <div className="sticky top-8 space-y-6">
              {Object.values(sidenotes)
                .filter((note) => note.type === "annotation")
                .map((note) => (
                  <div
                    key={note.id}
                    className={`text-sm transition-opacity duration-200 ${
                      activeNote === note.id || !activeNote ? "opacity-60 hover:opacity-100" : "opacity-0"
                    }`}
                  >
                    {note.content}
                  </div>
                ))}
            </div>
          </div>

          {/* Center Column - Main Content */}
          <div className="relative">
            {/* Metadata Header */}
            <div className="mb-16 border-b border-muted-foreground/20 pb-8">
              <h1 className="mb-8 text-3xl font-normal tracking-tight">{metadata.title}</h1>
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <p>Author: {metadata.author}</p>
                  <p>Date: {metadata.date}</p>
                  <p>Status: {metadata.status}</p>
                  <p>Word Count: {metadata.wordCount}</p>
                </div>
                <div>
                  <p>Confidence: {metadata.confidence}</p>
                  <p>Importance: {metadata.importance}</p>
                  <p>Last Updated: {metadata.lastUpdated}</p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-gray dark:prose-invert">
              <p>
                The development of safe and reliable AI systems represents one of the most critical challenges in modern
                computer science
                <sup
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveNote("ref-1")}
                  onMouseLeave={() => setActiveNote(null)}
                >
                  [1]
                </sup>
                . As we continue to advance the capabilities of artificial intelligence, ensuring these systems remain
                steerable, interpretable, and safe becomes increasingly important
                <sup
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveNote("note-2")}
                  onMouseLeave={() => setActiveNote(null)}
                >
                  [†]
                </sup>
                .
              </p>

              <p>
                Recent developments in constitutional AI have provided promising frameworks for addressing these
                challenges
                <sup
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveNote("note-1")}
                  onMouseLeave={() => setActiveNote(null)}
                >
                  [*]
                </sup>
                . These approaches combine theoretical guarantees with practical implementation strategies, offering a
                path forward for developing AI systems that are both powerful and controllable
                <sup
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveNote("ref-2")}
                  onMouseLeave={() => setActiveNote(null)}
                >
                  [2]
                </sup>
                .
              </p>
            </div>
          </div>

          {/* Right Column - References */}
          <div className="relative">
            <div className="sticky top-8 space-y-6">
              {Object.values(sidenotes)
                .filter((note) => note.type === "reference")
                .map((note) => (
                  <div
                    key={note.id}
                    className={`text-sm transition-opacity duration-200 ${
                      activeNote === note.id || !activeNote ? "opacity-60 hover:opacity-100" : "opacity-0"
                    }`}
                  >
                    {note.content}
                  </div>
                ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

