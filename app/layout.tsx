import React from "react"
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

export const metadata: Metadata = {
  title: 'MAISON | Luxury Fashion House - Designer Collections & Premium Apparel',
  description: 'Discover MAISON\'s curated luxury fashion collections featuring premium designer apparel, accessories, and footwear. Shop exclusive pieces crafted with impeccable quality and timeless elegance for the discerning individual.',
  generator: 'v0.app',
  keywords: ['luxury fashion', 'designer clothing', 'premium apparel', 'high-end fashion', 'luxury accessories', 'designer collections', 'MAISON fashion'],
  authors: [{ name: 'MAISON' }],
  creator: 'MAISON Fashion House',
  publisher: 'MAISON',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://maison.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MAISON | Luxury Fashion House',
    description: 'Discover timeless elegance and refined luxury. Curated collections featuring premium designer apparel and accessories.',
    url: 'https://maison.com',
    siteName: 'MAISON',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MAISON | Luxury Fashion House',
    description: 'Discover timeless elegance and refined luxury. Curated collections for the discerning individual.',
    creator: '@maison',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
