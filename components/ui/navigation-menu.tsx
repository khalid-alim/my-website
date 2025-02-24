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
            <motion.span
              initial={{ opacity: 0.8, scale: 0.95 }}
              whileHover={{ 
                opacity: 1, 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-10"
            >
              {item.name}
            </motion.span>
            {isActive && (
              <motion.div
                className="absolute bottom-0 left-0 h-px w-full bg-foreground"
                layoutId="underline"
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 30,
                  mass: 1
                }}
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
