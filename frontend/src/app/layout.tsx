import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CB Broker',
  description: 'Crypto Trading Platform',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
