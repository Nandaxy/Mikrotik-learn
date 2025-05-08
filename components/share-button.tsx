"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

interface ShareButtonProps {
  url: string
  title: string
  buttonText: string
}

export default function ShareButton({ url, title, buttonText }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const shareOptions = [
    {
      name: "Copy Link",
      action: async () => {
        try {
          await navigator.clipboard.writeText(url)
          toast({
            title: "Link copied to clipboard",
            description: "You can now paste the link anywhere",
          })
        } catch (err) {
          console.error("Failed to copy: ", err)
        }
      },
    },
    {
      name: "Facebook",
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
      },
    },
    {
      name: "Twitter",
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          "_blank",
        )
      },
    },
    {
      name: "WhatsApp",
      action: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`, "_blank")
      },
    },
    {
      name: "Telegram",
      action: () => {
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank")
      },
    },
  ]

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Share2 className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {shareOptions.map((option) => (
          <DropdownMenuItem
            key={option.name}
            onClick={() => {
              option.action()
              setIsOpen(false)
            }}
          >
            {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
