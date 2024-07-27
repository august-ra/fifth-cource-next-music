import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"


const montserrat = Montserrat({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title:       "SkyPro Music",
  description: "Listen every song everywhere",
}

type RootLayoutType = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: RootLayoutType) {
  return (
    <html lang="ru">
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
