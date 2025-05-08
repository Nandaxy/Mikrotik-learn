"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface MobileNavProps {
  items: {
    title: string
    items: {
      title: string
      href: string
    }[]
  }[]
  lang: string
}

export function MobileNav({ items, lang }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="fixed top-16 z-40 bg-background py-2 left-0 right-0 border-b">
      <div className="container">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
              <Menu className="h-5 w-5 mr-2" />
              <span>{lang === "id" ? "Menu Materi" : "Material Menu"}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="px-2 py-6">
              <h2 className="mb-4 text-lg font-semibold">
                {lang === "id" ? "Navigasi Materi" : "Material Navigation"}
              </h2>
              <Accordion type="multiple" className="w-full">
                {items.map((section, i) => (
                  <AccordionItem key={i} value={`section-${i}`}>
                    <AccordionTrigger className="text-sm">{section.title}</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2 pl-4">
                        {section.items.map((item, j) => (
                          <Link
                            key={j}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={`flex items-center text-sm ${
                              pathname === item.href ? "font-medium text-primary" : "text-muted-foreground"
                            }`}
                          >
                            {pathname === item.href && <ChevronRight className="mr-1 h-3 w-3" />}
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
