"use client"

import React from "react"
import Markdown from "markdown-to-jsx"
import { cn } from "@/lib/utils"

interface MarkdownContentProps {
  content: string
  className?: string
}

const CustomTable = ({ children, ...props }: React.HTMLProps<HTMLTableElement>) => (
  <div className="overflow-x-auto my-6">
    <table className="w-full border-collapse border border-border" {...props}>
      {children}
    </table>
  </div>
)

const CustomTableHead = ({ children, ...props }: React.HTMLProps<HTMLTableCellElement>) => (
  <th className="border border-border bg-muted p-2 text-left font-medium" {...props}>
    {children}
  </th>
)

const CustomTableCell = ({ children, ...props }: React.HTMLProps<HTMLTableCellElement>) => (
  <td className="border border-border p-2" {...props}>
    {children}
  </td>
)

// Modified to use a div for the caption instead of a p tag
const CustomImage = ({ alt, src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <span className="block my-6">
    <img src={src || "/placeholder.svg"} alt={alt || ""} className="rounded-md max-w-full h-auto mx-auto" {...props} />
    {alt && <span className="block text-center text-sm text-muted-foreground mt-2">{alt}</span>}
  </span>
)

const CustomIframe = (props: React.IframeHTMLAttributes<HTMLIFrameElement>) => (
  <div className="my-6 overflow-hidden rounded-md">
    <iframe className="w-full aspect-video" allowFullScreen {...props} />
  </div>
)

// Improved code block rendering
const CustomCodeBlock = ({ children, className, ...props }: React.HTMLProps<HTMLPreElement>) => {
  // Extract language from className if present (format: "language-xxx")
  const language = className?.match(/language-(\w+)/)?.[1] || ""

  return (
    <div className="my-6 relative overflow-hidden rounded-md bg-muted">
      {language && (
        <div className="absolute right-2 top-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
          {language}
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-sm" {...props}>
        <code className={cn("block", className)}>{children}</code>
      </pre>
    </div>
  )
}

const CustomCode = ({ children, ...props }: React.HTMLProps<HTMLElement>) => (
  <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm" {...props}>
    {children}
  </code>
)

// Extract heading ID from content if present
const extractHeadingId = (text: string) => {
  const match = text.match(/^(.*?)\s+\{#(.*?)\}$/)
  if (match) {
    return { text: match[1], id: match[2] }
  }
  return {
    text,
    id: text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-"),
  }
}

const CustomHeading = ({
  level,
  children,
  ...props
}: { level: number; children: React.ReactNode } & React.HTMLProps<HTMLHeadingElement>) => {
  const Component = `h${level}` as keyof JSX.IntrinsicElements
  const className = cn(
    "font-bold tracking-tight mt-8 mb-4 scroll-m-20",
    level === 1 && "text-3xl lg:text-4xl",
    level === 2 && "text-2xl lg:text-3xl border-b pb-2",
    level === 3 && "text-xl lg:text-2xl",
    level === 4 && "text-lg lg:text-xl",
    level === 5 && "text-base lg:text-lg",
    level === 6 && "text-base",
  )

  // Generate an ID from the heading text for anchor links
  let headingText = ""
  let id = ""

  if (typeof children === "string") {
    const extracted = extractHeadingId(children)
    headingText = extracted.text
    id = extracted.id
  } else {
    headingText = React.Children.toArray(children).join("")
    id = headingText
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-")
  }

  return (
    <Component className={className} id={id} {...props}>
      {typeof children === "string" ? headingText : children}
    </Component>
  )
}

// Custom paragraph component to handle special cases
const CustomParagraph = ({ children, ...props }: React.HTMLProps<HTMLParagraphElement>) => {
  // Check if the only child is an image or iframe
  const hasOnlyMediaChild =
    React.Children.count(children) === 1 &&
    React.isValidElement(children) &&
    (children.type === CustomImage || children.type === CustomIframe)

  // If it's a media element, don't wrap in a paragraph
  if (hasOnlyMediaChild) {
    return <>{children}</>
  }

  return <p {...props}>{children}</p>
}

// Process code blocks with backticks
const processContent = (content: string) => {
  // Replace triple backtick code blocks with custom format
  return content.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
    // Escape HTML entities to prevent rendering issues
    const escapedCode = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")

    return `<pre class="language-${language || "text"}">${escapedCode}</pre>`
  })
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  // Process content to handle code blocks better
  const processedContent = processContent(content)

  return (
    <div className={cn("prose prose-slate dark:prose-invert max-w-none", className)}>
      <Markdown
        options={{
          overrides: {
            h1: { component: CustomHeading, props: { level: 1 } },
            h2: { component: CustomHeading, props: { level: 2 } },
            h3: { component: CustomHeading, props: { level: 3 } },
            h4: { component: CustomHeading, props: { level: 4 } },
            h5: { component: CustomHeading, props: { level: 5 } },
            h6: { component: CustomHeading, props: { level: 6 } },
            p: { component: CustomParagraph },
            table: { component: CustomTable },
            th: { component: CustomTableHead },
            td: { component: CustomTableCell },
            img: { component: CustomImage },
            iframe: { component: CustomIframe },
            pre: { component: CustomCodeBlock },
            code: { component: CustomCode },
          },
        }}
      >
        {processedContent}
      </Markdown>
    </div>
  )
}
