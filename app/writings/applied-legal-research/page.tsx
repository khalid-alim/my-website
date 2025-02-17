"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronUp } from "lucide-react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { ThemeToggle } from "@/components/ui/theme-toggle"

type Section = {
  id: string
  title: string
  content: string
}

type Footnote = {
  id: string
  content: string
}

type Annotation = {
  id: string
  content: string
  sectionId: string
}

const sections: Section[] = [
  {
    id: "introduction",
    title: "Introduction",
    content: `
      Applied legal research stands at the intersection of theoretical jurisprudence and practical implementation, serving as a crucial bridge between academic understanding and real-world application. This essay explores an innovative approach to conducting applied legal research, emphasizing the importance of building real-world systems to generate better research questions and uncover unexpected insights.

      In the rapidly evolving landscape of legal technology and practice, traditional methods of legal research often fall short of addressing the complex challenges that arise in practical applications. The gap between theoretical frameworks and their implementation in real-world scenarios continues to widen, creating a pressing need for more effective approaches to legal research.

      This essay proposes a methodology that combines hands-on system development with rigorous academic inquiry. By actively engaging in the creation and refinement of practical legal tools and systems, researchers can gain unique insights that might otherwise remain undiscovered through conventional research methods<sup data-footnote="1">1</sup>.
    `,
  },
  {
    id: "practical-systems",
    title: "Building Practical Systems",
    content: `
      The development of practical legal systems represents a powerful approach to applied legal research, offering researchers direct engagement with the complexities and nuances of legal challenges. This hands-on methodology allows for the immediate identification of gaps between theoretical understanding and practical implementation, leading to more focused and relevant research questions.

      Consider, for instance, the development of a legal expert system for contract analysis<sup data-footnote="2">2</sup>. While theoretical research might suggest certain approaches to contract interpretation, the actual process of implementing these ideas in a functional system often reveals unexpected challenges and edge cases. These discoveries can prompt new lines of inquiry that might never have emerged from purely theoretical analysis.

      The process of building practical systems also forces researchers to confront the limitations of current legal theories and frameworks. When attempting to translate legal principles into algorithmic processes or user interfaces, researchers often encounter scenarios where existing theoretical frameworks provide insufficient guidance. These gaps in current understanding naturally generate new research questions and highlight areas requiring deeper investigation.

      Furthermore, the development of practical systems requires researchers to engage with real-world constraints and considerations that might be overlooked in purely theoretical work. Issues such as computational efficiency, user experience, and practical feasibility become integral parts of the research process, leading to more nuanced and applicable findings<sup data-footnote="3">3</sup>.
    `,
  },
  {
    id: "iterative-process",
    title: "The Iterative Process",
    content: `
      The development of legal technology systems inherently follows an iterative process, where each cycle of development and testing reveals new insights and challenges. This iterative nature aligns particularly well with the goals of applied legal research, as it allows for the continuous refinement of both the practical system and the underlying research questions.

      Initial development cycles often focus on basic functionality and core legal principles. However, as the system evolves, researchers frequently encounter edge cases and unexpected scenarios that challenge their initial assumptions. For example, in developing automated contract analysis tools, researchers might discover patterns in legal language that suggest previously unrecognized relationships between different areas of contract law<sup data-footnote="4">4</sup>.

      The iterative process also facilitates the identification of emergent properties and patterns that might not be visible through traditional research methods. As researchers refine their systems through multiple iterations, they often observe recurring challenges or unexpected relationships that warrant further investigation. These observations can lead to new research directions and contribute to the development of more comprehensive legal theories.

      Moreover, each iteration provides opportunities for empirical validation of theoretical concepts. When implementing legal principles in practical systems, researchers can directly observe how well these principles translate to real-world applications. This feedback loop between theory and practice helps refine both the practical system and the underlying theoretical framework<sup data-footnote="5">5</sup>.

      The iterative nature of system development also allows researchers to adapt their approach based on user feedback and practical outcomes. This responsiveness to real-world feedback helps ensure that both the research questions and the resulting insights remain relevant to actual legal practice.
    `,
  },
  {
    id: "interdisciplinary-approach",
    title: "Embracing Interdisciplinary Approaches",
    content: `
      Building practical legal systems often requires an interdisciplinary approach, combining legal expertise with fields such as computer science, data analysis, and user experience design. This cross-pollination of ideas can lead to innovative research directions and methodologies.

      For example, the integration of natural language processing techniques in legal research tools<sup data-footnote="6">6</sup> may reveal patterns in legal language usage across jurisdictions or over time. These observations can spark new research questions about the evolution of legal language and its impact on interpretation and application of the law.

      Collaboration between legal scholars and computer scientists can lead to the development of more sophisticated algorithms for legal reasoning and decision-making. This interdisciplinary work not only enhances the capabilities of legal technology but also challenges traditional legal theories and methodologies<sup data-footnote="7">7</sup>.
    `,
  },
  {
    id: "ethical-considerations",
    title: "Ethical Considerations",
    content: `
      As researchers engage in building practical legal systems, they must also grapple with ethical considerations. This process naturally leads to important research questions about the role of technology in law, access to justice, and the potential biases embedded in legal tech solutions.

      Researchers might explore questions such as: How can we ensure that AI-driven legal tools do not perpetuate or exacerbate existing biases in the legal system? What are the ethical implications of using predictive analytics in criminal justice decisions<sup data-footnote="8">8</sup>? These ethical challenges, encountered through practical system development, can drive crucial research in legal ethics and technology governance.

      The development of practical legal systems also raises important questions about transparency and accountability. As these systems become more complex and influential, ensuring that their decision-making processes are explainable and subject to appropriate oversight becomes a critical area of research<sup data-footnote="9">9</sup>.
    `,
  },
  {
    id: "conclusion",
    title: "Conclusion",
    content: `
      By engaging in the development of practical, real-world legal systems, researchers can uncover novel research questions and gain unexpected insights into the application of law. This approach to applied legal research not only enhances the relevance and impact of legal scholarship but also contributes to the advancement of legal practice and technology.

      As the legal field continues to evolve in the face of technological advancements, this hands-on approach to research will become increasingly valuable. It offers a pathway to bridging the gap between academic legal research and practical legal innovation, ultimately leading to more robust, nuanced, and applicable legal knowledge.

      The future of applied legal research lies in this dynamic interplay between theory and practice, where the development of practical systems informs theoretical advancements, and theoretical insights guide the creation of more sophisticated and effective legal technologies<sup data-footnote="10">10</sup>.
    `,
  },
]

const footnotes: Footnote[] = [
  {
    id: "1",
    content: "Susskind, R. (2019). Online Courts and the Future of Justice. Oxford University Press, pp. 23-45.",
  },
  {
    id: "2",
    content:
      "Katz, D. M., Bommarito, M. J., & Blackman, J. (2017). A general approach for predicting the behavior of the Supreme Court of the United States. PloS one, 12(4), e0174698.",
  },
  {
    id: "3",
    content:
      "Ashley, K. D. (2017). Artificial Intelligence and Legal Analytics: New Tools for Law Practice in the Digital Age. Cambridge University Press, Chapter 3.",
  },
  {
    id: "4",
    content:
      "Surden, H. (2019). Artificial Intelligence and Law: An Overview. Georgia State University Law Review, 35(4), 1305-1337.",
  },
  {
    id: "5",
    content:
      "Bench-Capon, T., & Sartor, G. (2003). A model of legal reasoning with cases incorporating theories and values. Artificial Intelligence and Law, 11(2), 97-143.",
  },
  {
    id: "6",
    content:
      "Chalkidis, I., Androutsopoulos, I., & Aletras, N. (2019). Neural legal judgment prediction in English. arXiv preprint arXiv:1906.02059.",
  },
  {
    id: "7",
    content:
      "Hildebrandt, M. (2018). Law as computation in the era of artificial legal intelligence: Speaking law to the power of statistics. University of Toronto Law Journal, 68(supplement 1), 12-35.",
  },
  {
    id: "8",
    content:
      "Završnik, A. (2019). Algorithmic justice: Algorithms and big data in criminal justice settings. European Journal of Criminology, 17(5), 623-642.",
  },
  {
    id: "9",
    content:
      "Pasquale, F. (2015). The Black Box Society: The Secret Algorithms That Control Money and Information. Harvard University Press.",
  },
  {
    id: "10",
    content:
      "Remus, D., Levy, F., & Bates, D. (2016). Can robots be lawyers? Computers, lawyers, and the practice of law. Georgetown Journal of Legal Ethics, 30, 501.",
  },
]

const annotations: Annotation[] = [
  {
    id: "intro-1",
    sectionId: "introduction",
    content:
      "The gap between theory and practice in legal research remains a persistent challenge. Consider exploring specific examples of this disconnect.",
  },
  {
    id: "intro-2",
    sectionId: "introduction",
    content:
      "The concept of 'building real-world systems' could be further elaborated. What types of systems are we referring to?",
  },
  {
    id: "practical-1",
    sectionId: "practical-systems",
    content:
      "The contract analysis example could be expanded with specific case studies from legal tech startups or research institutions.",
  },
  {
    id: "practical-2",
    sectionId: "practical-systems",
    content: "Consider exploring how different jurisdictions approach the implementation of legal expert systems.",
  },
  {
    id: "practical-3",
    sectionId: "practical-systems",
    content:
      "The concept of 'computational efficiency' in legal systems could be an interesting topic for further exploration.",
  },
  {
    id: "iterative-1",
    sectionId: "iterative-process",
    content:
      "The parallel between iterative development and common law evolution could be an interesting avenue for further research.",
  },
  {
    id: "iterative-2",
    sectionId: "iterative-process",
    content: "Document specific examples of how user feedback has led to theoretical breakthroughs in legal research.",
  },
  {
    id: "iterative-3",
    sectionId: "iterative-process",
    content:
      "The concept of 'empirical validation' in legal theory could be further explored. How does this differ from traditional legal scholarship?",
  },
  {
    id: "interdisciplinary-1",
    sectionId: "interdisciplinary-approach",
    content:
      "Explore the potential challenges and barriers to effective interdisciplinary collaboration in legal tech research.",
  },
  {
    id: "interdisciplinary-2",
    sectionId: "interdisciplinary-approach",
    content:
      "Consider discussing the role of social sciences, particularly sociology and anthropology, in understanding the social impacts of legal technologies.",
  },
  {
    id: "ethical-1",
    sectionId: "ethical-considerations",
    content:
      "The concept of 'bias' in AI-driven legal tools could be further elaborated. What types of biases are most concerning?",
  },
  {
    id: "ethical-2",
    sectionId: "ethical-considerations",
    content: "Explore the potential tension between efficiency and fairness in automated legal systems.",
  },
  {
    id: "conclusion-1",
    sectionId: "conclusion",
    content: "Consider discussing potential future directions for applied legal research methodologies.",
  },
  {
    id: "conclusion-2",
    sectionId: "conclusion",
    content:
      "Reflect on the potential long-term impacts of this approach on legal education and professional development.",
  },
]

export default function AppliedLegalResearch() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [activeFootnote, setActiveFootnote] = useState<string | null>(null)
  const [footnotePositions, setFootnotePositions] = useState<{ [key: string]: number }>({})
  const contentRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})
  const mainContentRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end end"],
  })

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDarkMode(isDarkMode)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const updateFootnotePositions = () => {
      if (!mainContentRef.current) return

      const positions: { [key: string]: number } = {}
      const mainContent = mainContentRef.current
      const mainContentRect = mainContent.getBoundingClientRect()

      // Find all footnote references in the text
      const footnoteRefs = mainContent.querySelectorAll("sup[data-footnote]")

      footnoteRefs.forEach((ref) => {
        const footnoteId = ref.getAttribute("data-footnote")
        if (footnoteId) {
          const rect = ref.getBoundingClientRect()
          // Calculate position relative to the main content
          positions[footnoteId] = rect.top - mainContentRect.top
        }
      })

      setFootnotePositions(positions)
    }

    // Initial update
    updateFootnotePositions()

    // Update on window resize
    window.addEventListener("resize", updateFootnotePositions)

    // Update on content changes
    const observer = new MutationObserver(updateFootnotePositions)
    if (mainContentRef.current) {
      observer.observe(mainContentRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
      })
    }

    return () => {
      window.removeEventListener("resize", updateFootnotePositions)
      observer.disconnect()
    }
  }, [])

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked)
    document.documentElement.classList.toggle("dark", checked)
  }

  const highlightFootnote = (footnoteId: string) => {
    setActiveFootnote(footnoteId)
    setTimeout(() => setActiveFootnote(null), 3000)
  }

  return (
    <div className={`min-h-screen bg-[#F5F5F3] dark:bg-darkNavy text-foreground ${isDarkMode ? "dark" : ""}`}>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-1 h-full z-50">
        <motion.div className="h-full bg-primary origin-top" style={{ scaleY: progress }} />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#F5F5F3] dark:bg-darkNavy border-b border-border backdrop-blur-sm">
        <div className="max-w-[90rem] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/writings"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to writings</span>
            </Link>
            <ThemeToggle checked={isDarkMode} onChange={toggleDarkMode} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 max-w-[90rem] mx-auto px-8" ref={contentRef}>
        <div className="grid grid-cols-[1fr_2.5fr_1fr] gap-24">
          {/* Left column - Annotations */}
          <div className="relative">
            <div className="sticky top-24 space-y-8">
              <AnimatePresence mode="wait">
                {annotations
                  .filter((note) => note.sectionId === activeSection)
                  .map((note) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {note.content}
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Center column - Main content */}
          <div ref={mainContentRef} className="prose prose-lg dark:prose-invert max-w-none">
            <h1 className="text-4xl font-semibold tracking-tight mb-4">One Way to Do Applied Legal Research</h1>
            <div className="text-sm text-muted-foreground mb-12">April 2024 · 15 min read</div>

            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                ref={(el) => (sectionRefs.current[section.id] = el)}
                className="mb-24"
              >
                <h2 className="text-3xl font-medium mb-8">{section.title}</h2>
                <div
                  className="text-muted-foreground space-y-6 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                  onClick={(e) => {
                    const target = e.target as HTMLElement
                    if (target.tagName === "SUP") {
                      const footnoteId = target.getAttribute("data-footnote")
                      if (footnoteId) highlightFootnote(footnoteId)
                    }
                  }}
                />
              </section>
            ))}
          </div>

          {/* Right column - Footnotes */}
          <div className="relative">
            <div className="absolute top-0 left-0 w-full">
              {footnotes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeFootnote === note.id ? 1 : 0.6,
                    y: footnotePositions[note.id] || 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className={`
                    absolute left-0 right-0
                    text-sm transition-colors duration-200
                    ${activeFootnote === note.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
                  `}
                >
                  <sup>{note.id}</sup> {note.content}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Scroll to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 bg-background/80 backdrop-blur-sm border border-border rounded-full p-2 shadow-lg z-40"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollYProgress.get() > 0.2 ? 1 : 0 }}
      >
        <ChevronUp className="h-5 w-5" />
      </motion.button>
    </div>
  )
}

