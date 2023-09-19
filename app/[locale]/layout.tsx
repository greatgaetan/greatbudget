import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { NextIntlClientProvider, useLocale } from "next-intl"
import { Inter, Poppins } from "next/font/google"
import { notFound } from "next/navigation"
import NextTopLoader from "nextjs-toploader"
import "./globals.css"

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  keywords: [
    "budget",
    "budgeting",
    "money",
    "finance",
    "personal finance",
    "personal budget",
    "personal budgeting",
  ],
  authors: [
    {
      name: "greatgaetan",
      url: "https://greatgaetan.com",
    },
  ],
  creator: "greatgaetan",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@greatgaetandev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: "../favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  description: siteConfig.description,
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const fontHeading = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
})

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = useLocale()

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound()
  }

  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }
  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          fontHeading.variable
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextTopLoader color={"#3464EB"} />
            {children}
            <Toaster />
            <TailwindIndicator />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
