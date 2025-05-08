"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight } from "lucide-react"

interface SidebarProps {
  items: {
    title: string
    items: {
      title: string
      href: string
    }[]
  }[]
  className?: string
}

export function Sidebar({ items, className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12", className)}>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-4 py-4">
          {items.map((section, i) => (
            <div key={i} className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">{section.title}</h2>
              <div className="space-y-1">
                {section.items.map((item, j) => (
                  <Button
                    key={j}
                    asChild
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Link href={item.href} className="flex items-center">
                      {pathname === item.href && <ChevronRight className="mr-2 h-4 w-4" />}
                      <span className={pathname === item.href ? "font-medium" : ""}>{item.title}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
