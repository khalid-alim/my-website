"use client"
import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.4, 
            ease: [0.22, 1, 0.36, 1] 
          }
        }}
        exit={{ 
          opacity: 0, 
          y: -10, 
          transition: { 
            duration: 0.2, 
            ease: [0.22, 1, 0.36, 1] 
          } 
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
