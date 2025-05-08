// Tambahkan file page.tsx di root untuk redirect ke /id (default language)
import { redirect } from "next/navigation"

export default function Home() {
  // Redirect ke halaman bahasa default (id)
  redirect("/id")
}
