"use client"
import { motion, AnimatePresence } from "framer-motion"

interface ThemeToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export function ThemeToggle({ checked, onChange }: ThemeToggleProps) {
  return (
    <motion.button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex h-[22px] w-[42px] flex-shrink-0 cursor-pointer items-center 
        rounded-full border border-black bg-[#F5F5F3] p-[2px]
        transition-all duration-100 ease-in-out hover:scale-[1.02]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary 
        focus-visible:ring-offset-2 active:scale-[0.98]
      `}
      whileTap={{ scale: 0.98 }}
      initial={false}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={checked ? "checked" : "unchecked"}
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        />
      </AnimatePresence>

      <motion.div
        className={`
          relative inline-block h-[16px] w-[16px] transform rounded-full 
          bg-black shadow-sm transition-all duration-200
          ${checked ? "shadow-sm" : "shadow-sm"}
        `}
        initial={false}
        animate={{
          x: checked ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 20,
          mass: 0.2,
          duration: 0.1,
        }}
        whileHover={{ scale: 1.02 }}
        drag="x"
        dragConstraints={{
          left: 0,
          right: 20,
        }}
        dragElastic={0.1}
        dragMomentum={false}
        onDragEnd={(_, info) => {
          if (info.offset.x > 10) {
            !checked && onChange(true)
          } else if (info.offset.x < -10) {
            checked && onChange(false)
          }
        }}
      />
    </motion.button>
  )
}

