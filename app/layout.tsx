"use client"
import { ReactQueryProvider } from '@/components/ReactQueryProvider'
import './globals.css'
import { SessionProvider } from "next-auth/react"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <SessionProvider>
          <body>
            {children}
          </body>
        </SessionProvider>
      </ReactQueryProvider>

    </html>
  )
}
