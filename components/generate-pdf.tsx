"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { jsPDF } from "jspdf"
import { toast } from "@/components/ui/use-toast"

interface GeneratePDFProps {
  title: string
  content: string
  lang: string
  buttonText: string
}

export default function GeneratePDF({ title, content, lang, buttonText }: GeneratePDFProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const stripMarkdown = (markdown: string) => {
    return (
      markdown
        // Remove HTML tags
        .replace(/<[^>]*>/g, "")
        // Remove image markdown
        .replace(/!\[(.*?)\]$$(.*?)$$/g, "")
        // Remove links but keep text
        .replace(/\[(.*?)\]$$(.*?)$$/g, "$1")
        // Remove headings
        .replace(/#{1,6}\s+/g, "")
        // Remove code blocks
        .replace(/```[\s\S]*?```/g, "")
        // Remove inline code
        .replace(/`([^`]+)`/g, "$1")
        // Remove blockquotes
        .replace(/^\s*>\s+/gm, "")
        // Remove horizontal rules
        .replace(/^\s*[-*_]{3,}\s*$/gm, "")
        // Remove table formatting but keep content
        .replace(/\|/g, " ")
        .replace(/^[-:]+$/gm, "")
        // Remove extra whitespace
        .replace(/\n\s*\n/g, "\n\n")
        .trim()
    )
  }

  const handleGeneratePDF = async () => {
    setIsGenerating(true)
    try {
      // Create a new PDF document
      const doc = new jsPDF()

      // Set title
      doc.setFontSize(18)
      doc.text(title, 20, 20)

      // Add a line under the title
      doc.setDrawColor(0, 0, 0)
      doc.line(20, 25, 190, 25)

      // Set content font size
      doc.setFontSize(12)

      // Strip markdown from content
      const strippedContent = stripMarkdown(content)

      // Split text into lines that fit the page width
      const splitText = doc.splitTextToSize(strippedContent, 170)

      // Add content to PDF
      doc.text(splitText, 20, 35)

      // Save the PDF
      doc.save(`${title.replace(/\s+/g, "-").toLowerCase()}.pdf`)

      toast({
        title: lang === "id" ? "PDF berhasil dibuat" : "PDF successfully generated",
        description: lang === "id" ? "Unduhan akan segera dimulai" : "Your download will start shortly",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: lang === "id" ? "Gagal membuat PDF" : "Failed to generate PDF",
        description:
          lang === "id" ? "Terjadi kesalahan saat membuat PDF" : "An error occurred while generating the PDF",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button variant="outline" className="w-full justify-start" onClick={handleGeneratePDF} disabled={isGenerating}>
      <Download className="mr-2 h-4 w-4" />
      {isGenerating ? (lang === "id" ? "Membuat PDF..." : "Generating PDF...") : buttonText}
    </Button>
  )
}
