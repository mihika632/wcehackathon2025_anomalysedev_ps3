import Link from "next/link"
import { Brain } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-premium-indigo-800/20 bg-premium-dark-900/80 backdrop-blur supports-[backdrop-filter]:bg-premium-dark-900/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-premium-fuchsia-500 to-premium-indigo-600 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70" />
              <div className="relative rounded-lg bg-gradient-to-r from-premium-fuchsia-500 via-premium-fuchsia-600 to-premium-indigo-600 p-2 transition-all duration-300 group-hover:scale-105">
                <Brain className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="font-bold text-premium-indigo-50">Jai HO</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {[
              { href: "/", label: "Home" },
              { href: "/dashboard", label: "Dashboard" },
              { href: "/map", label: "Maps" },
              { href: "/alerts", label: "Alerts" },
              { href: "/reports", label: "Reports" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative font-medium text-premium-indigo-200 transition-colors hover:text-premium-fuchsia-300"
              >
                <span className="relative">
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 scale-x-0 bg-gradient-to-r from-premium-fuchsia-500 to-premium-indigo-500 transition-transform duration-300 hover:scale-x-100" />
                </span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-premium-indigo-200 hover:bg-premium-fuchsia-500/10 hover:text-premium-fuchsia-300"
          >
            Sign In
          </Button>
          <Button className="bg-gradient-to-r from-premium-fuchsia-500 to-premium-indigo-600 text-white hover:from-premium-fuchsia-600 hover:to-premium-indigo-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-premium-fuchsia-500/25">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}

