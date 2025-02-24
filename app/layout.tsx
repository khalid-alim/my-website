import type { Metadata } from 'next'
import { PageTransition } from '@/components/ui/page-transition'
import { InteractiveCursorProvider } from '@/components/ui/cursor-effects'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <InteractiveCursorProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </InteractiveCursorProvider>
      </body>
    </html>
  )
}
