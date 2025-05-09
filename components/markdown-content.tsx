"use client"

import React, { JSX } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
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

const CustomImage = ({ alt, src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <span className="block my-6">
    <img src={src || "/placeholder.svg"} alt={alt || ""} className="rounded-md max-w-full h-auto mx-auto md:h-[50%] md:w-[50%]" {...props} />
    {alt && <span className="block text-center text-sm text-muted-foreground mt-2">{alt}</span>}
  </span>
)

const CustomIframe = (props: React.IframeHTMLAttributes<HTMLIFrameElement>) => (
  <div className="my-6 overflow-hidden rounded-md">
    <iframe className="w-full aspect-video" allowFullScreen {...props} />
  </div>
)

const CustomCodeBlock = ({ node, inline, className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || "")
  const language = match ? match[1] : ""

  if (inline) {
    return (
      <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm" {...props}>
        {children}
      </code>
    )
  }

  return (
    <div className="my-6 relative overflow-hidden rounded-md bg-muted">
      {language && (
        <div className="absolute right-2 top-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
          {language}
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-sm">
        <code className={cn("block", className)} {...props}>
          {children}
        </code>
      </pre>
    </div>
  )
}

const CustomHeading = ({ level, children, ...props }: any) => {
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

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  )
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div className={cn("prose prose-slate dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          h1: (props) => <CustomHeading level={1} {...props} />,
          h2: (props) => <CustomHeading level={2} {...props} />,
          h3: (props) => <CustomHeading level={3} {...props} />,
          h4: (props) => <CustomHeading level={4} {...props} />,
          h5: (props) => <CustomHeading level={5} {...props} />,
          h6: (props) => <CustomHeading level={6} {...props} />,
          p: ({ node, ...props }) => <p className="mb-4" {...props} />,
          a: ({ node, ...props }) => <a className="text-primary hover:underline" {...props} />,
          table: (props) => <CustomTable {...props} />,
          th: (props) => <CustomTableHead {...props} />,
          td: (props) => <CustomTableCell {...props} />,
          img: (props) => <CustomImage {...props} />,
          iframe: (props) => <CustomIframe {...props} />,
          code: (props) => <CustomCodeBlock {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-border pl-4 italic" {...props} />
          ),
          hr: ({ node, ...props }) => <hr className="my-6 border-border" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}