import type React from "react"
import ScrollToTop from "./scroll-to-top"
import ScrollToHash from "./scroll-to-hash"

export default function MaterialDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ScrollToTop />
      <ScrollToHash />
      {children}
    </>
  )
}
