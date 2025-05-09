import type React from "react"
import { getDictionary } from "../dictionaries"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "./mobile-nav"

export default async function MaterialsLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as "id" | "en")
  const { materials } = dict

  const sidebarItems = materials.chapters.map((chapter) => {
    return {
      title: chapter.title,
      items: chapter.sections.map((section, sectionIndex) => {
        return {
          title: section.title,
          href: `/${lang}/materials/${materials.chapters.indexOf(chapter) + 1}/${sectionIndex + 1}`,
        }
      }),
    }
  })

  return (
    <div className="pt-14 lg:pt-0 px-2">
      <div className="lg:hidden">
        <MobileNav items={sidebarItems} lang={lang} />
      </div>
      <div className="flex flex-col lg:flex-row">
        <aside className="hidden lg:block lg:w-80 shrink-0 border-r sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto">
          <Sidebar items={sidebarItems} />
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
