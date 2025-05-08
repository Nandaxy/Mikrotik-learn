import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateReadingTime(content: string): string {
  // Remove markdown syntax and HTML tags
  const cleanText = content
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/`([^`]+)`/g, "$1") // Remove inline code
    .replace(/!\[(.*?)\]$$(.*?)$$/g, "") // Remove images
    .replace(/\[(.*?)\]$$(.*?)$$/g, "$1") // Keep link text, remove URL
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/#/g, "") // Remove heading markers
    .replace(/\*\*/g, "") // Remove bold markers
    .replace(/\*/g, "") // Remove italic markers

  // Count words (split by whitespace)
  const words = cleanText.split(/\s+/).filter((word) => word.length > 0)
  const wordCount = words.length

  // Average reading speed: 200-250 words per minute
  const readingSpeed = 225
  const minutes = Math.ceil(wordCount / readingSpeed)

  // Return formatted string
  return `${minutes} menit`
}
