import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Casino Utan Svensk Licens - Bästa Casino Utan Spelpaus 2025',
  description: 'Casino utan svensk licens och casino utan Spelpaus är online casinon du helt lagligt kan spela på som inte är en del av det svenska licenssystemet.',
  metadataBase: new URL('https://yatzyregler.com'),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    locale: 'sv_SE',
    type: 'website',
    title: 'Casino Utan Svensk Licens - Bästa Casino Utan Spelpaus 2025',
    description: 'Casino utan svensk licens och casino utan Spelpaus är online casinon du helt lagligt kan spela på som inte är en del av det svenska licenssystemet.',
    url: 'https://yatzyregler.com/',
    siteName: 'Yatzy regler',
    images: [
      {
        url: '/images/yatzyregler.com-logga-stor.webp',
        width: 1200,
        height: 630,
        alt: 'yatzyregler.com logga',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Casino Utan Svensk Licens - Bästa Casino Utan Spelpaus 2025',
    description: 'Casino utan svensk licens och casino utan Spelpaus är online casinon du helt lagligt kan spela på som inte är en del av det svenska licenssystemet.',
    images: ['/images/yatzyregler.com-logga-stor.webp'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Header />
        <main className="site-main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
