"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { MapPin, Mail, Phone, Globe, ChevronDown } from "lucide-react"
import { Header } from "@/components/ui/header"

type Experience = {
  title: string
  company: string
  location: string
  date: string
  description: string[]
}

type Education = {
  degree: string
  institution: string
  date: string
  details: string
}

type Involvement = {
  role: string
  organization: string
  date: string
  details: string[]
}

const experiences: Experience[] = [
  {
    title: "Researcher",
    company: "Office of the Special Presidential Envoy for Climate Change",
    location: "Nairobi, KE",
    date: "May 2024 - present",
    description: [
      "Developed climate finance model (n=48 African nations) revealing 1.7% cross-continental underinvestment gap (p<.05, CI: 0.8-3.9%)",
      "Drove Kenya's COP29 strategy (causal attribution uncertain)",
    ],
  },
  {
    title: "Researcher",
    company: "MIT Governance Lab",
    location: "Cambridge, MA",
    date: "Jun - Aug 2023",
    description: [
      "Engineered distributed web crawler infrastructure achieving 99.3% uptime",
      "Developed NLP pipeline supporting research (forthcoming) in APSR (2024)",
      "Processed >40k documents while maintaining consistent cross-validation performance (κ>0.75)",
    ],
  },
  {
    title: "Researcher",
    company: "National Science Foundation",
    location: "Los Angeles, CA",
    date: "Jun - Aug 2022",
    description: [
      "Built hierarchical regression models testing principal-agent dynamics in development funding flows",
      "Key finding: donor intervention explains r²=0.67 of variance in aid misallocation",
      "Conducted longitudinal analysis of NATO expansion patterns (1990–99)",
    ],
  },
  {
    title: "Intern",
    company: "American Bar Association",
    location: "Washington, DC",
    date: "Jan - Apr 2023",
    description: [
      "Analyzed defense counsel guideline adherence (n=160 cases; SCOTUS=72, appellate=88)",
      "Key finding: jurisdictional heterogeneity in 'reasonable performance' interpretation",
    ],
  },
  {
    title: "Consultant",
    company: "United Nations",
    location: "Remote",
    date: "Jan - May 2021",
    description: [
      "Investigated gender-violence/water-access relationships in Somalia through UNOPS",
      "Found d=0.45 elevated risk for female water collectors at >2km distances",
      "Framework adopted by EU GAP-III and regional WASH programs (n=3)",
    ],
  },
  {
    title: "Intern",
    company: "International Crisis Group",
    location: "Remote",
    date: "Jan - May 2021",
    description: [
      "Generated policy reports for African Union, EU, UN and bilateral security partners",
      "Aggregated OSINT from social media, news networks, and regional reporting (n>500 weekly)",
    ],
  },
]

const education: Education = {
  degree: "B.A. in Philosophy, Politics, Economics",
  institution: "University of Minnesota, Honors",
  date: "2020 - 2024",
  details: "3.94 GPA",
}

const involvements: Involvement[] = [
  {
    role: "VP/Instructor",
    organization: "UMN Ballroom Dance Club",
    date: "Spring 2022 - May 2024",
    details: [
      "2024 US National Championship title",
      "Contributed to team's nationals victory",
      "2yr e-board, managed $18k budget driving 700+ event attendance",
    ],
  },
  {
    role: "Peer Research Consultant",
    organization: "UMN Libraries",
    date: "Sep 2022 - May 2023",
    details: ["Mentored ~50 freshmen in academic research", "Taught database usage & citation management"],
  },
  {
    role: "Managing Editor",
    organization: "Epistemai",
    date: "Sep 2021 - May 2022",
    details: ["+19% submissions YoY (n=68→81)", "Increased non-analytic papers from 15%→35% via targeted CFPs"],
  },
]

const skills = [
  "Python",
  "R",
  "SQL",
  "TypeScript",
  "JavaScript",
  "React",
  "NodeJS",
  "HTML/CSS",
  "LaTeX",
  "Statistical Computing",
  "NLP",
  "Causal Inference",
  "DataViz",
]

const technologies = [
  "PostgreSQL",
  "Git",
  "Scrapy",
  "API Integrations",
  "NLTK",
  "D3.js",
  "BERT",
  "PyMC",
  "EconML",
  "brms",
  "GeoPandas",
  "tidyverse",
]

export default function CV() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end end"],
  })

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -50])

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
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border"
        style={{ opacity: headerOpacity, y: headerY }}
      >
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </motion.div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24" ref={contentRef}>
        <main className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16 sm:mb-24"
          >
            <h1 className="text-6xl font-light tracking-tight mb-4">Khalid Ali M.</h1>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <a
                href="mailto:khalidalim.cv@gmail.com"
                className="group flex items-center hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                khalidalim.cv@gmail.com
              </a>
              <a href="tel:+17633278945" className="group flex items-center hover:text-foreground transition-colors">
                <Phone className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                (763) 327-8945
              </a>
              <a
                href="https://notkhalid.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center hover:text-foreground transition-colors"
              >
                <Globe className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                notkhalid.com
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="md:col-span-2 space-y-16">
              <Section title="Experience">
                <div className="space-y-12">
                  {experiences.map((exp, index) => (
                    <ExperienceItem key={index} experience={exp} index={index} />
                  ))}
                </div>
              </Section>

              <Section title="Campus Involvement">
                <div className="space-y-8">
                  {involvements.map((inv, index) => (
                    <InvolvementItem key={index} involvement={inv} index={index} />
                  ))}
                </div>
              </Section>
            </div>

            <div className="space-y-16">
              <Section title="Education">
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">{education.degree}</h3>
                  <p className="text-muted-foreground">{education.institution}</p>
                  <p className="text-sm text-muted-foreground">{education.date}</p>
                  <p className="text-sm">{education.details}</p>
                </div>
              </Section>

              <Section title="Technical Skills">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Skill key={index} name={skill} />
                  ))}
                </div>
              </Section>

              <Section title="Technologies">
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <Skill key={index} name={tech} />
                  ))}
                </div>
              </Section>
            </div>
          </div>
        </main>
      </div>

      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
      </motion.div>
    </div>
  )
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <h2 className="text-2xl font-medium mb-6 pb-2 border-b border-border">{title}</h2>
    {children}
  </motion.section>
)

const ExperienceItem: React.FC<{ experience: Experience; index: number }> = ({ experience, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-muted-foreground before:rounded-full"
  >
    <div className="flex justify-between items-baseline mb-2">
      <h3 className="text-xl font-medium">{experience.title}</h3>
      <span className="text-sm text-muted-foreground">{experience.date}</span>
    </div>
    <p className="mb-2 text-lg">{experience.company}</p>
    <p className="text-sm text-muted-foreground mb-4 flex items-center">
      <MapPin className="w-4 h-4 mr-1" />
      {experience.location}
    </p>
    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
      {experience.description.map((desc, i) => (
        <li key={i}>{desc}</li>
      ))}
    </ul>
  </motion.div>
)

const InvolvementItem: React.FC<{ involvement: Involvement; index: number }> = ({ involvement, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="flex justify-between items-baseline mb-2">
      <h3 className="text-lg font-medium">{involvement.role}</h3>
      <span className="text-sm text-muted-foreground">{involvement.date}</span>
    </div>
    <p className="mb-2">{involvement.organization}</p>
    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
      {involvement.details.map((detail, i) => (
        <li key={i}>{detail}</li>
      ))}
    </ul>
  </motion.div>
)

const Skill: React.FC<{ name: string }> = ({ name }) => (
  <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-sm transition-colors hover:bg-primary hover:text-primary-foreground cursor-default">
    {name}
  </span>
)

