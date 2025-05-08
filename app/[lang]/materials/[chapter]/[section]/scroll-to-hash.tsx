"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToHash() {
  const pathname = usePathname()

  useEffect(() => {
    // Fungsi untuk scroll ke elemen dengan ID yang sesuai
    const scrollToHash = () => {
      const hash = window.location.hash
      if (hash) {
        // Hapus karakter # dari hash
        const id = hash.substring(1)
        const element = document.getElementById(id)

        if (element) {
          // Tambahkan sedikit delay untuk memastikan DOM sudah sepenuhnya dirender
          setTimeout(() => {
            // Scroll ke elemen dengan offset untuk navbar
            const navbarHeight = 80 // Perkiraan tinggi navbar + menu
            const elementPosition = element.getBoundingClientRect().top + window.scrollY
            window.scrollTo({
              top: elementPosition - navbarHeight,
              behavior: "smooth",
            })
          }, 100)
        }
      }
    }

    // Jalankan saat komponen dimount dan saat pathname berubah
    scrollToHash()

    // Tambahkan event listener untuk hashchange
    window.addEventListener("hashchange", scrollToHash)

    // Cleanup event listener saat komponen unmount
    return () => {
      window.removeEventListener("hashchange", scrollToHash)
    }
  }, [pathname])

  return null
}
