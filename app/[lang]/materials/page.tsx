import Link from "next/link"
import { getDictionary } from "../dictionaries"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang as "id" | "en")
  
  return {
    title: dict.materials.metadata?.title || dict.materials.title,
    description: dict.materials.metadata?.description || dict.materials.intro,
  }
}

export default async function MaterialsPage({ params }: { params: { lang: string } }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "id" | "en")
  const { materials } = dict

  return (
    <div className="py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{materials.title}</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{materials.intro}</p>
        </div>

        <div className="space-y-6">
          {materials.chapters.map((chapter, chapterIndex) => (
            <Card key={chapterIndex} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <CardTitle>{chapter.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                  {chapter.sections.map((section, sectionIndex) => (
                    <AccordionItem
                      key={sectionIndex}
                      value={`item-${chapterIndex}-${sectionIndex}`}
                      className="border-0"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-muted/50">
                        <div className="flex items-center text-left">
                          <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                            {sectionIndex + 1}
                          </span>
                          {section.title}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 pt-0">
                        <CardDescription className="text-base">{section.description}</CardDescription>
                        <Link
                          href={`/${lang}/materials/${chapterIndex + 1}/${sectionIndex + 1}`}
                          className="mt-4 flex items-center text-sm font-medium text-primary hover:underline"
                        >
                          Baca Materi <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
