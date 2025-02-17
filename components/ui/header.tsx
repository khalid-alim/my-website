import { NavMenu } from "./nav-menu"
import { ThemeToggle } from "./theme-toggle"

interface HeaderProps {
  isDarkMode: boolean
  toggleDarkMode: (checked: boolean) => void
}

export function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  return (
    <header className="py-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <NavMenu />
          <ThemeToggle checked={isDarkMode} onChange={toggleDarkMode} />
        </div>
      </div>
    </header>
  )
}

