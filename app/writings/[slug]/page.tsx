"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Moon, Sun, ArrowLeft, Calendar, Clock, Tag, User, FileText, ThumbsUp, BarChart } from "lucide-react"

type Sidenote = {
  id: string
  content: string
  type: "annotation" | "reference"
}

const essays = {
  "future-of-ai-systems": {
    metadata: {
      title: "The Future of AI Systems",
      author: "Dario Amodei",
      date: "2024-02-16",
      status: "Draft",
      confidence: "High",
      importance: "8/10",
      wordCount: "2,500",
      lastUpdated: "2024-02-16",
      readingTime: "15 min",
      tags: ["AI", "Machine Learning", "Ethics"],
    },
    content: `
      <h2>Introduction</h2>
      <p>
        The development of safe and reliable AI systems represents one of the most 
        critical challenges in modern computer science
        <sup
          class="cursor-pointer text-primary hover:text-primary-dark transition-colors duration-200"
          data-note="ref-1"
        >
          [1]
        </sup>
        . As we continue to advance the capabilities of artificial intelligence, 
        ensuring these systems remain steerable, interpretable, and safe becomes
        increasingly important
        <sup
          class="cursor-pointer text-primary hover:text-primary-dark transition-colors duration-200"
          data-note="note-1"
        >
          [†]
        </sup>
        .
      </p>

      <h2>The Current Landscape</h2>
      <p>
        Recent developments in constitutional AI have provided promising frameworks 
        for addressing these challenges
        <sup
          class="cursor-pointer text-primary hover:text-primary-dark transition-colors duration-200"
          data-note="note-2"
        >
          [*]
        </sup>
        . These approaches combine theoretical guarantees with practical 
        implementation strategies, offering a path forward for developing AI 
        systems that are both powerful and controllable
        <sup
          class="cursor-pointer text-primary hover:text-primary-dark transition-colors duration-200"
          data-note="ref-2"
        >
          [2]
        </sup>
        .
      </p>

      <h2>Challenges in AI Safety</h2>
      <p>
        One of the primary challenges in AI safety is the alignment problem: ensuring 
        that AI systems behave in ways that are aligned with human values and intentions
        <sup
          class="cursor-pointer text-primary hover:text-primary-dark transition-colors duration-200"
          data-note="ref-3"
        >
          [3]
        </sup>
        . This challenge becomes increasingly complex as AI systems become more 
        sophisticated and autonomous.
      </p>

      <p>
        Another critical aspect is the interpretability of AI decision-making processes. 
        As AI systems are deployed in high-stakes environments such as healthcare and 
        criminal justice, it becomes crucial to understand how these systems arrive at 
        their conclusions
        <sup
          class="cursor-pointer text-primary hover:text-primary-dark transition-colors duration-200"
          data-note="note-3"
        >
          [‡]
        </sup>
        .
      </p>

      <h2>Promising Approaches</h2>
      <p>
        Several promising approaches have emerged to address these challenges:
      </p>

      <ol>
        <li>
          <strong>Inverse Reinforcement Learning:</strong> This technique aims to infer 
          the underlying reward function that an agent (human or AI) is optimizing, 
          which can help in aligning AI systems with human preferences
          <sup
            class="cursor-pointer text-primary hover:text-primary-dark transition-colors duration-200"
            data-note="ref-4"
          >
            [4]
          </sup>
          .
        </li>
        <li>
          <strong>Robust Optimization:</strong> This approach focuses on creating AI 
          systems that perform well even under worst-case scenarios, enhancing their 
          reliability and safety
          <sup
            class="cursor-pointer text-primary hover:text-primary-dark transition-colors duration-200"
            data-note="ref-5"
          >
            [5]
          </sup>
          .
        </li>
        <li>
          <strong>Transparency and Explainability:</strong> Developing methods to make 
          AI decision-making processes more transparent and explainable to humans
          <sup
            class="cursor-pointer text-primary hover:text-primary-dark transition-colors duration-200"
            data-note="note-4"
          >
            [§]
          </sup>
          .
        </li>
      </ol>

      <h2>Future Directions</h2>
      <p>
        As we look to the future of AI systems, several key areas require continued 
        focus and innovation:
      </p>

      <ul>
        <li>Developing more robust testing and verification methods for AI systems</li>
        <li>Creating standardized benchmarks for AI safety and reliability</li>
        <li>Advancing research in AI ethics and its practical implementation</li>
        <li>Fostering interdisciplinary collaboration between AI researchers, ethicists, 
            and policymakers</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        The future of AI systems holds immense potential, but it also presents 
        significant challenges. By focusing on safety, interpretability, and alignment, 
        we can harness the power of AI while mitigating its risks. As we continue to 
        push the boundaries of what's possible with artificial intelligence, it's 
        crucial that we remain vigilant and proactive in addressing these fundamental 
        issues
        <sup
          class="cursor-pointer text-primary hover:text-primary-dark transition-colors duration-200"
          data-note="note-5"
        >
          [¶]
        </sup>
        .
      </p>
    `,
    sidenotes: {
      "note-1": {
        id: "note-1",
        content:
          "The term 'steerable' here refers to the ability to reliably direct AI system behavior within defined parameters.",
        type: "annotation",
      },
      "note-2": {
        id: "note-2",
        content:
          "This builds on earlier work in constitutional AI, particularly the frameworks developed at Anthropic in 2023.",
        type: "annotation",
      },
      "note-3": {
        id: "note-3",
        content:
          "Interpretability in AI is crucial for building trust and ensuring accountability in high-stakes decision-making processes.",
        type: "annotation",
      },
      "note-4": {
        id: "note-4",
        content:
          "Explainable AI (XAI) is an emerging field that aims to make AI decision-making processes more transparent and understandable to humans.",
        type: "annotation",
      },
      "note-5": {
        id: "note-5",
        content:
          "The balance between innovation and safety in AI development remains a central challenge for researchers and policymakers alike.",
        type: "annotation",
      },
      "ref-1": {
        id: "ref-1",
        content:
          "Amodei et al. (2023). Constitutional AI: A Framework for Reliable Systems. Nature Machine Intelligence.",
        type: "reference",
      },
      "ref-2": {
        id: "ref-2",
        content: "Smith, J. & Johnson, M. (2024). Advances in Neural Network Interpretability. NeurIPS 2024.",
        type: "reference",
      },
      "ref-3": {
        id: "ref-3",
        content: "Russell, S. (2019). Human Compatible: Artificial Intelligence and the Problem of Control. Viking.",
        type: "reference",
      },
      "ref-4": {
        id: "ref-4",
        content: "Ng, A. Y., & Russell, S. J. (2000). Algorithms for inverse reinforcement learning. ICML.",
        type: "reference",
      },
      "ref-5": {
        id: "ref-5",
        content:
          "Sinha, A., Namkoong, H., & Duchi, J. (2018). Certifiable distributional robustness with principled adversarial training. ICLR.",
        type: "reference",
      },
      "ref-6": {
        id: "ref-6",
        content: "Gabriel, I. (2020). Artificial Intelligence, Values, and Alignment. Minds and Machines.",
        type: "reference",
      },
    },
  },
}

export default function Essay() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeNote, setActiveNote] = useState<string | null>(null)
  const [readingProgress, setReadingProgress] = useState(0)
  const params = useParams()
  const slug = params.slug as string
  const essay = essays[slug]
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDarkMode(darkModeMediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
    darkModeMediaQuery.addEventListener("change", handleChange)

    const handleScroll = () => {
      if (contentRef.current) {
        const element = contentRef.current
        const totalHeight = element.clientHeight - element.offsetTop
        const windowHeight = window.innerHeight
        const scrollTop = window.scrollY
        const currentPosition = scrollTop + windowHeight
        const percentScrolled = Math.min((currentPosition / totalHeight) * 100, 100)
        setReadingProgress(percentScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleChange)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  if (!essay) {
    return <div>Essay not found</div>
  }

  return (
    <div
      className={`min-h-screen bg-background text-foreground transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}
    >
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>
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
              {Object.values(essay.sidenotes)
                .filter((note) => note.type === "annotation")
                .map((note) => (
                  <div
                    key={note.id}
                    className={`text-sm transition-opacity duration-200 ${
                      activeNote === note.id ? "opacity-100" : "opacity-60 hover:opacity-100"
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
            <div className="mb-16 p-6 bg-muted rounded-lg shadow-sm">
              <h1 className="mb-4 text-3xl font-semibold tracking-tight">{essay.metadata.title}</h1>
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="space-y-2">
                  <p className="flex items-center">
                    <User className="w-4 h-4 mr-2" /> {essay.metadata.author}
                  </p>
                  <p className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" /> {essay.metadata.date}
                  </p>
                  <p className="flex items-center">
                    <FileText className="w-4 h-4 mr-2" /> {essay.metadata.wordCount} words
                  </p>
                  <p className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" /> {essay.metadata.readingTime} read
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-2" /> Confidence: {essay.metadata.confidence}
                  </p>
                  <p className="flex items-center">
                    <BarChart className="w-4 h-4 mr-2" /> Importance: {essay.metadata.importance}
                  </p>
                  <p className="flex items-center">
                    <Tag className="w-4 h-4 mr-2" /> {essay.metadata.tags.join(", ")}
                  </p>
                  <p className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" /> Updated: {essay.metadata.lastUpdated}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div
              ref={contentRef}
              className="prose prose-lg prose-gray dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: essay.content }}
              onClick={(e) => {
                const target = e.target as HTMLElement
                if (target.tagName === "SUP") {
                  const noteId = target.getAttribute("data-note")
                  setActiveNote(noteId)
                } else {
                  setActiveNote(null)
                }
              }}
            />
          </div>

          {/* Right Column - References */}
          <div className="relative">
            <div className="sticky top-8 space-y-6">
              {Object.values(essay.sidenotes)
                .filter((note) => note.type === "reference")
                .map((note) => (
                  <div
                    key={note.id}
                    className={`text-sm transition-opacity duration-200 ${
                      activeNote === note.id ? "opacity-100" : "opacity-60 hover:opacity-100"
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

