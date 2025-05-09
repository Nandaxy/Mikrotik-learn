import Image from "next/image"
import { getDictionary } from "../dictionaries"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, BookOpen, Users, Lightbulb } from "lucide-react"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang as "id" | "en")

  return {
    title: dict.about.metadata?.title || dict.about.title,
    description: dict.about.metadata?.description || dict.about.intro,
  }
}

export default async function AboutPage({ params }: { params: { lang: string } }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "id" | "en")
  const { about } = dict

  const valueIcons = [
    <Target key="target" className="h-8 w-8 text-primary" />,
    <BookOpen key="book" className="h-8 w-8 text-primary" />,
    <Users key="users" className="h-8 w-8 text-primary" />,
    <Lightbulb key="lightbulb" className="h-8 w-8 text-primary" />,
  ]

  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-5xl space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{about.title}</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{about.intro}</p>
        </div>

        {/* Mission Section */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">{about.mission.title}</h2>
            <p className="text-muted-foreground">{about.mission.description}</p>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=300&width=400"
              width={400}
              height={300}
              alt="Our Mission"
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Story Section */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 lg:order-1 flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=300&width=400"
              width={400}
              height={300}
              alt="Our Story"
              className="rounded-lg object-cover"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">{about.story.title}</h2>
            <p className="text-muted-foreground">{about.story.description}</p>
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center">{about.team.title}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {about.team.members.map((member, index) => (
              <Card key={index} className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-4">
                    <Image
                      src={`/placeholder.svg?height=100&width=100`}
                      width={100}
                      height={100}
                      alt={member.name}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-center">{member.name}</CardTitle>
                  <CardDescription className="text-center">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center">{about.values.title}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {about.values.list.map((value, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="mb-2 flex justify-center">{valueIcons[index]}</div>
                  <CardTitle className="text-center">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-center">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
