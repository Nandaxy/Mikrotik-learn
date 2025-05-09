"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Sun, Moon, Router, Globe, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface NavbarProps {
  dict: {
    home: string
    writing: string
    faq: string
    acknowledgements: string
    materials: string
    about: string
    contact: string
    darkMode: string
    lightMode: string
    language: string
  }
  lang: string
}

export default function Navbar({ dict, lang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(undefined)

  useEffect(() => {
    setMounted(true)
    setCurrentTheme(theme)
  }, [theme])

  const toggleTheme = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    setCurrentTheme(newTheme)
    setTheme(newTheme)
  }

  const routes = [
    { href: `/${lang}`, label: dict.home },
    { href: `/${lang}/materials`, label: dict.materials },
    { href: `/${lang}/writing`, label: dict.writing },
    { href: `/${lang}/faq`, label: dict.faq },
    { href: `/${lang}/acknowledgements`, label: dict.acknowledgements },
    { href: `/${lang}/about`, label: dict.about },
    { href: `/${lang}/contact`, label: dict.contact },
  ]

  const toggleLanguage = () => {
    const newLang = lang === "id" ? "en" : "id"
    const currentPath = pathname.split("/").slice(2).join("/")
    return `/${newLang}${currentPath ? `/${currentPath}` : ""}`
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <div className="flex items-center gap-2 px-2 py-4">
                <Router className="h-6 w-6" />
                <span className="font-bold">Belajar Mikrotik</span>
              </div>
              <nav className="flex flex-col gap-4 px-2">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center py-2 text-lg font-medium ${
                      pathname === route.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {route.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href={`/${lang}`} className="flex items-center gap-2">
            <Router className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Belajar Mikrotik</span>
          </Link>
        </div>

        <nav className="hidden md:flex md:gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium ${
                pathname === route.href ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">

          <Link href="https://github.com/Nandaxy/Mikrotik-learn" target="_blank" className="h-5 w-5 mr-1">
            <Github className="h-5 w-5" />
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">{dict.language}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={toggleLanguage()}>{lang === "id" ? "English" : "Bahasa Indonesia"}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {mounted && currentTheme === "dark" ? (
              <>
                <Sun className="h-5 w-5" />
                <span className="sr-only">{dict.lightMode}</span>
              </>
            ) : (
              <>
                <Moon className="h-5 w-5" />
                <span className="sr-only">{dict.darkMode}</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
