"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BookOpen, ArrowUpRight, Calendar, ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"

type WritingItem = {
  title: string
  href: string
  abstract?: string
  lastUpdated: string
  references: number
  backlinks: number
}

type WritingCategory = {
  title: string
  description: string
  items: WritingItem[]
}

const writings: WritingCategory[] = [
  {
    title: "Essays",
    description:
      "Long-form thoughts on things I care about. Technology, society, relationships, and whatever else captures my attention.",
    items: [
      {
        title: "Unintended Acceleration: The Optimization-Control Tension in AI Governance",
        href: "/writings/unintended-acceleration",
        abstract: "Exploring the challenges of balancing AI optimization with human control in governance structures.",
        lastUpdated: "2024-02-15",
        references: 42,
        backlinks: 17,
      },
      {
        title: "The Next Phase of Compute Governance",
        href: "/writings/next-phase-compute-governance",
        abstract: "Analyzing emerging trends and future directions in the governance of computational resources.",
        lastUpdated: "2024-01-30",
        references: 38,
        backlinks: 23,
      },
      {
        title: "The Delicate Art of Letting Go",
        href: "/writings/delicate-art-letting-go",
        abstract:
          "Reflections on the process of releasing attachments and embracing change in various aspects of life.",
        lastUpdated: "2024-03-10",
        references: 15,
        backlinks: 8,
      },
      {
        title: "Travel as Information Theory",
        href: "/writings/travel-information-theory",
        abstract: "Exploring the parallels between travel experiences and concepts from information theory.",
        lastUpdated: "2024-04-05",
        references: 20,
        backlinks: 12,
      },
    ],
  },
  {
    title: "Research",
    description:
      "Formal investigations and academic work - ongoing projects, literature reviews, conference posters, and papers.",
    items: [
      {
        title:
          "Computation and the Philosophy of Property: Rethinking Legal Ontology in the Age of Artificial Intelligence",
        href: "/writings/computation-philosophy-property",
        abstract:
          "An examination of how AI and computation are reshaping our understanding of property and legal frameworks.",
        lastUpdated: "2024-01-15",
        references: 56,
        backlinks: 28,
      },
      {
        title: "Advances in Neural Network Interpretability",
        href: "/writings/interpretability",
        abstract: "New techniques for understanding and explaining neural network decisions",
        lastUpdated: "2023-12-01",
        references: 47,
        backlinks: 35,
      },
    ],
  },
  {
    title: "Notes",
    description:
      "A collection of structured observations, learnings, and reviews across different domains including literature, media, and personal interests.",
    items: [
      {
        title: "One Way to Do Applied Legal Research",
        href: "/writings/applied-legal-research",
        abstract:
          "Thoughts on how building practical, real-world systems can lead to better research questions and unexpected discoveries in applied research.",
        lastUpdated: "2024-04-18",
        references: 23,
        backlinks: 14,
      },
      {
        title: "Dijkstra's Algorithm",
        href: "/writings/dijkstras-algorithm",
        abstract: "Some rough notes from learning about Dijkstra's algorithm for finding shortest paths in graphs.",
        lastUpdated: "2024-03-05",
        references: 18,
        backlinks: 9,
      },
      {
        title: "Recent Developments in AI Safety",
        href: "/writings/ai-safety",
        abstract: "A comprehensive overview of AI safety research",
        lastUpdated: "2023-12-15",
        references: 30,
        backlinks: 19,
      },
      {
        title: "Centers and Triangles: Ballroom Dance Insights",
        href: "/writings/ballroom-dance-notes",
        abstract: "Observations and techniques focusing on body positioning and movement in ballroom dancing.",
        lastUpdated: "2024-05-01",
        references: 5,
        backlinks: 3,
      },
      {
        title: "Normal People (Hulu) Review",
        href: "/writings/normal-people-review",
        abstract:
          "A critical analysis of the Hulu adaptation of Sally Rooney's novel, exploring themes of love and class.",
        lastUpdated: "2024-04-20",
        references: 8,
        backlinks: 5,
      },
      {
        title: "Reflections on 'How to Love' by Thich Nhat Hanh",
        href: "/writings/how-to-love-reflections",
        abstract:
          "Personal insights and lessons learned from Thich Nhat Hanh's guide to cultivating compassion and mindfulness in relationships.",
        lastUpdated: "2024-03-25",
        references: 10,
        backlinks: 6,
      },
    ],
  },
  {
    title: "Garden",
    description:
      "A space for growing ideas and observations. Some might evolve into essays or research, others might just live here as seeds of thought. My digital thinking space.",
    items: [
      {
        title: "AI Regulation and Export Controls",
        href: "/writings/ai-regulation",
        abstract: "Analyzing the impact of recent regulatory changes on AI development",
        lastUpdated: "2024-02-05",
        references: 12,
        backlinks: 7,
      },
      {
        title: "Building Reliable ML Infrastructure",
        href: "/writings/ml-infrastructure",
        abstract: "Best practices for scalable and maintainable machine learning systems",
        lastUpdated: "2024-01-20",
        references: 18,
        backlinks: 13,
      },
      {
        title: "The Path Forward for AI Development",
        href: "/writings/future-ai",
        abstract: "Exploring the future directions of AI research and applications",
        lastUpdated: "2023-12-10",
        references: 25,
        backlinks: 20,
      },
    ],
  },
]

export default function Writings() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

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
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="mb-12 px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back home</span>
            </Link>
            <ThemeToggle checked={isDarkMode} onChange={toggleDarkMode} />
          </div>
        </header>

        <main className="mt-8 space-y-40">
          {writings.map((category) => (
            <WritingSection
              key={category.title}
              category={category}
              isActive={activeCategory === category.title}
              onHover={(isHovering) => setActiveCategory(isHovering ? category.title : null)}
            />
          ))}
        </main>
      </div>
    </div>
  )
}

function WritingSection({
  category,
  isActive,
  onHover,
}: {
  category: WritingCategory
  isActive: boolean
  onHover: (isHovering: boolean) => void
}) {
  return (
    <section className="grid grid-cols-[1fr_3fr_1fr] gap-8 md:gap-12 lg:gap-16">
      <div className="col-start-2 col-span-1 space-y-16">
        <h2
          className="text-2xl font-medium mb-8 pb-2 border-b border-muted-foreground/20"
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
        >
          {category.title}
        </h2>
        <div className="space-y-12">
          {category.items.map((item, index) => (
            <WritingItem key={index} item={item} />
          ))}
        </div>
      </div>
      <div className="col-start-3 row-start-1 row-span-full">
        <div
          className={`sticky top-24 text-sm text-muted-foreground transition-opacity duration-300 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        >
          {category.description}
        </div>
      </div>
    </section>
  )
}

function WritingItem({ item }: { item: WritingItem }) {
  return (
    <article className="group relative flex items-start">
      <div className="flex-grow">
        <Link href={item.href} className="block focus:outline-none group" tabIndex={0}>
          <h3 className="text-lg font-normal leading-snug transition-colors duration-200 group-hover:text-primary group-focus-visible:text-primary border-b border-transparent group-hover:border-primary pb-1">
            {item.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground/60 mt-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          {item.abstract}
        </p>
      </div>
      <div className="ml-4 text-right text-xs text-muted-foreground/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex-shrink-0 w-24">
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

