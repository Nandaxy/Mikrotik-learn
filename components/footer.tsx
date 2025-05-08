import Link from "next/link"
import { Router } from "lucide-react"

interface FooterProps {
  dict: {
    copyright: string
    terms: string
    privacy: string
    contact: string
  }
  lang: string
}

export default function Footer({ dict, lang }: FooterProps) {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
          <Router className="h-6 w-6" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">{dict.copyright}</p>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <Link href={`/${lang}/terms`} className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {dict.terms}
          </Link>
          <Link href={`/${lang}/privacy`} className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {dict.privacy}
          </Link>
          <Link href={`/${lang}/contact`} className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {dict.contact}
          </Link>
        </div>
      </div>
    </footer>
  )
}
