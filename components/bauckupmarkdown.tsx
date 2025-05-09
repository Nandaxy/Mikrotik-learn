"use client"
import React from "react"
import Markdown from "markdown-to-jsx"
import { cn } from "@/lib/utils"

interface MarkdownContentProps {
  content: string
  className?: string
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div className={cn("prose prose-slate dark:prose-invert", className)}>
      <Markdown options={{
        overrides: {
          h1: { props: { className: "text-3xl font-bold mb-4" } },
          h2: { props: { className: "text-2xl font-semibold mt-8 mb-4" } },
          h3: { props: { className: "text-xl font-medium mt-6 mb-3" } },
          p: { props: { className: "mb-4" } },
          ul: { props: { className: "list-disc pl-6 mb-4" } },
          li: { props: { className: "mb-1" } },
        }
      }}>
        {content}
      </Markdown>
    </div>
  )
}