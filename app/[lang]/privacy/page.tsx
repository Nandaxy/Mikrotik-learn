import { getDictionary } from "../dictionaries"
import { MarkdownContent } from "@/components/markdown-content"
import { getPrivacyContent } from "@/lib/static-content"

export const generateMetadata = async ({ params }: { params: { lang: string } }) => {
  const { lang } = await params
  const dict = await getDictionary(lang as "id" | "en")

  return {
    title: dict.privacy.metadata?.title || dict.privacy.title,
    description: dict.privacy.metadata?.description
  }
}

export default async function PrivacyPage({ params }: { params: { lang: string } }) {
const { lang } = await params
  const dict = await getDictionary(lang as "id" | "en")
  const { privacy } = dict

  const content = await getPrivacyContent(params.lang)

  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{privacy.title}</h1>
          <p className="text-muted-foreground md:text-xl">
            {privacy.lastUpdated}: {privacy.updateDate}
          </p>
        </div>

        <article className="prose prose-slate dark:prose-invert">
          <MarkdownContent content={content} />
        </article>
      </div>
    </div>
  )
}
