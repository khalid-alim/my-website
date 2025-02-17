"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

const navItems = [
  { name: "home", href: "/" },
  { name: "cv", href: "/cv" },
  { name: "writings", href: "/writings" },
]

export function NavMenu() {
  const pathname = usePathname()

  return (
    <nav className="relative flex space-x-8 text-sm">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`relative py-2 transition-colors duration-300 ${
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.name}
            {isActive && (
              <motion.div
                className="absolute bottom-0 left-0 h-px w-full bg-foreground"
                layoutId="underline"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}

