import { Metadata } from "next"
import { getDictionary } from "../dictionaries"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang as "id" | "en")

  return {
    title: dict.faq.metadata?.title || dict.faq.title,
    description: dict.faq.metadata?.description
  }
}

export default async function FAQPage({ params }: { params: { lang: string } }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "id" | "en")
  const { faq } = dict

  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{faq.title}</h1>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faq.questions.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium">{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
