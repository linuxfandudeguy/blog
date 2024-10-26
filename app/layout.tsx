import Link from "next/link"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { ModeToggle } from "@/components/mode-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "welcome to my blog",
  description: "a blog owned by lelbois",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-2xl mx-auto py-10 px-4">
            <header>
              <div className="flex items-center justify-between">
                <ModeToggle />
                <nav className="ml-auto text-sm font-medium space-x-6">
                  <Link href="/">Home</Link>
                  <Link href="/about">About</Link>
                </nav>
              </div>
            </header>
            <main>{children}</main>
            {/* CuterCounter Code */}
            <div className="flex justify-center mt-10">
              <a href="https://www.cutercounter.com/" target="_blank" rel="noopener noreferrer">
                <img src="https://www.cutercounter.com/hits.php?id=hexqdxco&nd=9&style=80" alt="counter for blog" style={{ border: '0' }} />
              </a>
                <img src="/badges/feed.svg" alt="RSS Feed" className="h-6 w-6" />
            </div>
            {/* End of CuterCounter Code */}
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
