import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { calculateReadingTime } from "./utils"

// Define the materials directory
const materialsDirectory = path.join(process.cwd(), "materials")

export async function getMaterialContent(lang: string, chapter: string, section: string) {
  // Create the file path
  const fullPath = path.join(materialsDirectory, lang, `chapter-${chapter}`, `section-${section}.md`)

  // Default content if file doesn't exist
  let fileContents = ""
  const metadata = {
    title: "",
    difficulty: "Pemula",
    difficultyEn: "Beginner",
    duration: "30 menit",
    prerequisites: [] as string[],
    relatedMaterials: [] as { title: string; path: string }[],
    tableOfContents: [] as { title: string; id: string }[],
    references: [] as { title: string; url?: string }[], // Tambahkan array references
  }

  try {
    // Read markdown file
    fileContents = fs.readFileSync(fullPath, "utf8")
  } catch (error) {
    console.error(`Error reading file: ${fullPath}`, error)
    // Use default content if file doesn't exist
    fileContents = `---
title: ${lang === "id" ? "Materi Tidak Ditemukan" : "Material Not Found"}
difficulty: ${lang === "id" ? "Pemula" : "Beginner"}
difficultyEn: Beginner
duration: 30 menit
prerequisites:
  - ${lang === "id" ? "Pengetahuan dasar jaringan komputer" : "Basic computer networking knowledge"}
  - ${lang === "id" ? "Pemahaman dasar IP Address" : "Basic understanding of IP Addressing"}
relatedMaterials:
  - title: ${lang === "id" ? "Pengenalan Mikrotik" : "Introduction to Mikrotik"}
    path: /${lang}/materials/1/1
  - title: ${lang === "id" ? "Perangkat Mikrotik dan RouterOS" : "Mikrotik Devices and RouterOS"}
    path: /${lang}/materials/1/2
tableOfContents:
  - title: ${lang === "id" ? "Pendahuluan" : "Introduction"}
    id: introduction
  - title: ${lang === "id" ? "Apa itu Mikrotik?" : "What is Mikrotik?"}
    id: what-is-mikrotik
  - title: ${lang === "id" ? "Sejarah Mikrotik" : "History of Mikrotik"}
    id: history
  - title: ${lang === "id" ? "Fitur Utama" : "Main Features"}
    id: features
  - title: ${lang === "id" ? "Kesimpulan" : "Conclusion"}
    id: conclusion
references:
  - title: ${lang === "id" ? "Dokumentasi Resmi Mikrotik" : "Official Mikrotik Documentation"}
    url: https://wiki.mikrotik.com/
---

## ${lang === "id" ? "Pendahuluan" : "Introduction"} {#introduction}

${
  lang === "id"
    ? "Materi ini belum tersedia. Silakan kembali lagi nanti."
    : "This material is not available yet. Please check back later."
}
`
  }

  // Use gray-matter to parse the metadata section
  const matterResult = matter(fileContents)

  // Calculate reading time based on content
  const readingTime = calculateReadingTime(matterResult.content)

  // Process the content to fix heading IDs
  const processedContent = matterResult.content
    // Replace heading IDs format from "## Title {#id}" to "## Title" and add HTML id attribute
    .replace(/^(#{1,6})\s+(.*?)\s+\{#(.*?)\}/gm, "$1 $2")

  return {
    content: processedContent,
    metadata: {
      ...metadata,
      ...matterResult.data,
      duration: readingTime, // Override with calculated reading time
    },
  }
}

export async function getAllMaterialPaths() {
  const languages = ["id", "en"]
  const paths: { lang: string; chapter: string; section: string }[] = []

  for (const lang of languages) {
    const langDir = path.join(materialsDirectory, lang)

    try {
      if (!fs.existsSync(langDir)) continue

      const chapters = fs.readdirSync(langDir)

      for (const chapter of chapters) {
        const chapterDir = path.join(langDir, chapter)
        const chapterNum = chapter.replace("chapter-", "")

        if (fs.statSync(chapterDir).isDirectory()) {
          const sections = fs.readdirSync(chapterDir)

          for (const section of sections) {
            if (section.endsWith(".md")) {
              const sectionNum = section.replace("section-", "").replace(".md", "")
              paths.push({
                lang,
                chapter: chapterNum,
                section: sectionNum,
              })
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error reading directory: ${langDir}`, error)
    }
  }

  return paths
}

// Function to count materials and chapters
export async function getMaterialStats(lang = "id") {
  let materialCount = 0
  let chapterCount = 0

  try {
    const langDir = path.join(materialsDirectory, lang)
    if (fs.existsSync(langDir)) {
      const chapters = fs.readdirSync(langDir)
      chapterCount = chapters.length

      for (const chapter of chapters) {
        const chapterDir = path.join(langDir, chapter)
        if (fs.statSync(chapterDir).isDirectory()) {
          const sections = fs.readdirSync(chapterDir)
          materialCount += sections.filter((file) => file.endsWith(".md")).length
        }
      }
    }
  } catch (error) {
    console.error(`Error counting materials: ${error}`)
  }

  return {
    materialCount,
    chapterCount,
  }
}
