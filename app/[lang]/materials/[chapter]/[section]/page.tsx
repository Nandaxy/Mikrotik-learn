import Link from "next/link"
import { getDictionary } from "../../../dictionaries"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Clock, FileText } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { getMaterialContent } from "@/lib/materials"
import ShareButton from "@/components/share-button"
import GeneratePDF from "@/components/generate-pdf"
import { MarkdownContent } from "@/components/markdown-content"

export const metadata = {
  other: {
    scrollToTop: true,
  },
}

export default async function MaterialDetailPage({
  params,
}: {
  params: { lang: string; chapter: string; section: string }
}) {
  const dict = await getDictionary(params.lang as "id" | "en")
  const { materialDetail, materials } = dict

  // Get chapter and section from params
  const chapterIndex = Number.parseInt(params.chapter) - 1
  const sectionIndex = Number.parseInt(params.section) - 1

  // Get chapter and section data
  const chapter = materials.chapters[chapterIndex]
  const section = chapter?.sections[sectionIndex]

  // Get material content
  const content = await getMaterialContent(params.lang, params.chapter, params.section)

  // Calculate next and previous links
  let prevLink = null
  let nextLink = null

  if (sectionIndex > 0) {
    // Previous section in same chapter
    prevLink = `/${params.lang}/materials/${params.chapter}/${sectionIndex}`
  } else if (chapterIndex > 0) {
    // Last section of previous chapter
    const prevChapter = materials.chapters[chapterIndex - 1]
    prevLink = `/${params.lang}/materials/${chapterIndex}/${prevChapter.sections.length}`
  }

  if (sectionIndex < chapter?.sections.length - 1) {
    // Next section in same chapter
    nextLink = `/${params.lang}/materials/${params.chapter}/${sectionIndex + 2}`
  } else if (chapterIndex < materials.chapters.length - 1) {
    // First section of next chapter
    nextLink = `/${params.lang}/materials/${chapterIndex + 2}/1`
  }

  // Process table of contents to remove {#id} format
  const processedTableOfContents = content.metadata.tableOfContents.map((item) => ({
    ...item,
    title: item.title.replace(/\s+\{#.*?\}$/, ""), // Remove {#id} from title
  }))

  // Material metadata
  const materialData = {
    title: section?.title || "Material Not Found",
    lastUpdated: "2025-05-08",
    difficulty: params.lang === "id" ? content.metadata.difficulty : content.metadata.difficultyEn,
    duration: content.metadata.duration,
    prerequisites: content.metadata.prerequisites,
    relatedMaterials: content.metadata.relatedMaterials,
    tableOfContents: processedTableOfContents,
    references: content.metadata.references || [], // Tambahkan references
  }

  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://belajarmikrotik.id"}/${params.lang}/materials/${params.chapter}/${params.section}`

  return (
    <div className="container py-0.5 md:py-8 lg:py-12">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {/* Breadcrumb */}
          <div>
            <Link
              href={`/${params.lang}/materials`}
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              {materialDetail.backToMaterials}
            </Link>
          </div>

          {/* Material Header */}
          <div className="space-y-3">
            <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">{materialData.title}</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <FileText className="mr-1 h-4 w-4" />
                {chapter?.title}
              </div>
              <span>•</span>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {materialData.duration}
              </div>
              <span>•</span>
              <div>
                {materialDetail.lastUpdated}: {materialData.lastUpdated}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>{materialData.difficulty}</Badge>
            </div>
          </div>

          {/* Material Content */}
          <div className="pt-2">
            <MarkdownContent content={content.content} />
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap justify-between gap-4 pt-6">
            {prevLink ? (
              <Link href={prevLink} className="flex-shrink-0">
                <Button variant="outline" size="sm" className="h-10">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  {materialDetail.prevMaterial}
                </Button>
              </Link>
            ) : (
              <div></div>
            )}
            {nextLink ? (
              <Link href={nextLink} className="flex-shrink-0 ml-auto">
                <Button size="sm" className="h-10">
                  {materialDetail.nextMaterial}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{params.lang === "id" ? "Tindakan" : "Actions"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <GeneratePDF
                title={materialData.title}
                content={content.content}
                lang={params.lang}
                buttonText={materialDetail.downloadPdf}
              />
              <ShareButton url={currentUrl} title={materialData.title} buttonText={materialDetail.shareTitle} />
            </CardContent>
          </Card>

          {/* Table of Contents */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{materialDetail.tableOfContents}</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-1">
                {materialData.tableOfContents.map((item, index) => (
                  <a key={index} href={`#${item.id}`} className="block text-sm hover:text-primary py-1">
                    {item.title}
                  </a>
                ))}
              </nav>
            </CardContent>
          </Card>

          {/* Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{params.lang === "id" ? "Informasi" : "Information"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">{materialDetail.difficulty}</p>
                <p className="text-sm text-muted-foreground">{materialData.difficulty}</p>
              </div>
              <div>
                <p className="text-sm font-medium">{materialDetail.duration}</p>
                <p className="text-sm text-muted-foreground">{materialData.duration}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium">{materialDetail.prerequisites}</p>
                <ul className="mt-2 space-y-1">
                  {materialData.prerequisites.map((prereq, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      • {prereq}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Related Materials */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{materialDetail.relatedMaterials}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {materialData.relatedMaterials.map((material, index) => (
                  <li key={index}>
                    <Link href={material.path} className="text-sm hover:text-primary">
                      {material.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* References */}
          {materialData.references.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  {materialDetail.references || (params.lang === "id" ? "Referensi" : "References")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {materialData.references.map((reference, index) => (
                    <li key={index}>
                      {reference.url ? (
                        <a
                          href={reference.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:text-primary flex items-center"
                        >
                          {reference.title}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4 ml-1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      ) : (
                        <span className="text-sm">{reference.title}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
