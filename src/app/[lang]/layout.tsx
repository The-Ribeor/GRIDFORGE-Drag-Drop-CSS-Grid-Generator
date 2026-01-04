import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { translations } from "@/lib/translations";
import { ThemeProvider } from "next-themes";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const BASE_URL = "https://gridforge-builder.netlify.app";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = (lang === 'en' || lang === 'es') ? lang : 'es';
  const t = translations[currentLang].seo;

  return {
    title: t.title,
    description: t.description,
    keywords: ["CSS Grid", "Grid Generator", "Web Design Tool", "Frontend", "Layout Builder", "GRIDFORGE"],
    authors: [{ name: "The Ribeor", url: "https://www.theribeor.com" }],
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${currentLang}`,
      languages: {
        'es-ES': `${BASE_URL}/es`,
        'en-US': `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      type: "website",
      url: `${BASE_URL}/${currentLang}`,
      images: [
        {
          url: `/logo.png`, 
          width: 512,
          height: 512,
          alt: "GRIDFORGE Logo",
        },
      ],
    },
    twitter: {
      card: "summary", 
      title: t.title,
      description: t.description,
      images: [`${BASE_URL}/logo.png`],
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = (lang === 'en' || lang === 'es') ? lang : 'es';
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "GRIDFORGE",
    "operatingSystem": "All",
    "applicationCategory": "DesignApplication",
    "url": `${BASE_URL}/${currentLang}`,
    "description": translations[currentLang].seo.description,
    "softwareVersion": "1.0",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <html lang={currentLang} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-app-bg selection:bg-blue-500/30 transition-colors duration-300`}>
        <ThemeProvider attribute="data-theme" defaultTheme="dark">
          <h1 className="sr-only">{translations[currentLang].seo.title}</h1>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}