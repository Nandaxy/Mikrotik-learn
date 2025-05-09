import { getDictionary } from "../dictionaries"
import { MarkdownContent } from "@/components/markdown-content"
import { getTermsContent } from "@/lib/static-content"

export const generateMetadata = async ({ params }: { params: { lang: string } }) => {
  const { lang } = await params
  const dict = await getDictionary(lang as "id" | "en")

  return {
    title: dict.terms.metadata?.title || dict.terms.title,
    description: dict.terms.metadata?.description
  }
}

export default async function TermsPage({ params }: { params: { lang: string } }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "id" | "en")
  const { terms } = dict

  // Get terms content based on language
  const content = await getTermsContent(params.lang)

  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{terms.title}</h1>
          <p className="text-muted-foreground md:text-xl">
            {terms.lastUpdated}: {terms.updateDate}
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <MarkdownContent content={content} />
        </div>
      </div>
    </div>
  )
}
