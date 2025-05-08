import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getDictionary } from "./dictionaries"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Belajar Mikrotik",
  description: "Platform edukasi untuk belajar Mikrotik dari dasar hingga mahir",
}

export async function generateStaticParams() {
  return [{ lang: "id" }, { lang: "en" }]
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { lang: string }
}>) {
  const dict = await getDictionary(params.lang as "id" | "en")

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar dict={dict.navbar} lang={params.lang} />
            <div className="flex-1">{children}</div>
            <Footer dict={dict.footer} lang={params.lang} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
