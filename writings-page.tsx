"use client"

import { useState } from "react"
import Link from "next/link"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WritingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}>
      <div className="mx-auto max-w-2xl px-4 py-8">
        <header className="mb-12 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Writings</h1>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </header>

        <main className="space-y-12">
          <section>
            <h2 className="mb-4 text-xl font-medium">Featured Essay</h2>
            <div className="group space-y-2">
              <Link href="/essays/machines-of-loving-grace" className="block">
                <h3 className="text-lg font-medium group-hover:underline">Machines of Loving Grace</h3>
                <p className="text-sm text-muted-foreground">
                  An exploration of AI systems that are steerable, interpretable and safe
                </p>
                <span className="mt-1 inline-block text-sm text-muted-foreground">12 min read · Feb 2024</span>
              </Link>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-medium">Recent Posts</h2>
            <div className="space-y-6">
              <div className="group">
                <Link href="/posts/deep-seek-export-controls" className="block">
                  <h3 className="text-lg font-medium group-hover:underline">On DeepSeek and Export Controls</h3>
                  <span className="text-sm text-muted-foreground">5 min read · Jan 2024</span>
                </Link>
              </div>
              <div className="group">
                <Link href="/posts/ai-governance" className="block">
                  <h3 className="text-lg font-medium group-hover:underline">Thoughts on AI Governance</h3>
                  <span className="text-sm text-muted-foreground">8 min read · Dec 2023</span>
                </Link>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-medium">Academic Papers</h2>
            <div className="space-y-6">
              <div className="group">
                <Link href="/papers/reinforcement-learning" className="block">
                  <h3 className="text-lg font-medium group-hover:underline">
                    Constitutional AI: A Framework for Machine Learning Systems
                  </h3>
                  <p className="text-sm text-muted-foreground">Published in Nature Machine Intelligence</p>
                  <span className="text-sm text-muted-foreground">2024</span>
                </Link>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-medium">Notes & Thoughts</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group border-l-2 border-muted pl-4">
                  <Link href={`/notes/${i}`} className="block">
                    <p className="text-sm group-hover:underline">
                      Shorter thoughts on AI development, research directions, and industry trends...
                    </p>
                    <span className="text-xs text-muted-foreground">Feb {i}, 2024</span>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="mt-16 border-t pt-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-sm text-muted-foreground hover:underline">
              ← Back to homepage
            </Link>
            <Button variant="outline" size="sm">
              Subscribe to updates
            </Button>
          </div>
        </footer>
      </div>
    </div>
  )
}

