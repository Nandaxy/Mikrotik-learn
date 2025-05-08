import { getDictionary } from "../dictionaries"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, GitPullRequest, Type, MessageSquare } from "lucide-react"

export default async function WritingPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as "id" | "en")
  const { writing } = dict

  const guidelineIcons = [
    <FileText key="filetext" className="h-8 w-8 text-primary" />,
    <Type key="type" className="h-8 w-8 text-primary" />,
    <GitPullRequest key="gitpullrequest" className="h-8 w-8 text-primary" />,
    <MessageSquare key="messagesquare" className="h-8 w-8 text-primary" />,
  ]

  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{writing.title}</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{writing.intro}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {writing.guidelines.map((guideline, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="mb-2">{guidelineIcons[index]}</div>
                <CardTitle>{guideline.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{guideline.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Contoh Format Penulisan</h2>
          <pre className="rounded-md bg-muted p-4 overflow-x-auto">
            <code>{`# Judul Materi

## Pengantar
Penjelasan singkat tentang materi yang akan dibahas.

## Isi
### Sub-bagian 1
Konten detail dengan penjelasan dan contoh.

### Sub-bagian 2
Konten detail dengan penjelasan dan contoh.

## Kesimpulan
Ringkasan poin-poin penting dari materi.

## Referensi
- Sumber 1
- Sumber 2`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
