import { getDictionary } from "../dictionaries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Code, Router, Globe } from "lucide-react"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang as "id" | "en")

  return {
    title: dict.acknowledgements.metadata?.title || dict.acknowledgements.title,
    description: dict.acknowledgements.metadata?.description || dict.acknowledgements.intro,
  }
}

export default async function AcknowledgementsPage({ params }: { params: { lang: string } }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "id" | "en")
  const { acknowledgements } = dict

  const contributorIcons = [
    <Users key="users" className="h-8 w-8 text-primary" />,
    <Code key="code" className="h-8 w-8 text-primary" />,
    <Router key="router" className="h-8 w-8 text-primary" />,
    <Globe key="globe" className="h-8 w-8 text-primary" />,
  ]

  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{acknowledgements.title}</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{acknowledgements.intro}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {acknowledgements.contributors.map((contributor, index) => (
            <Card key={index} className="h-full">
              <CardHeader className="flex flex-row items-center gap-4">
                {contributorIcons[index]}
                <CardTitle>{contributor.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{contributor.contribution}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
