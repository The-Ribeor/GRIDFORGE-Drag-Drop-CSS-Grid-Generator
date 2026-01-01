import type { Metadata, Viewport } from "next"; // Añadimos Viewport para control móvil
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GRIDFORGE | Drag & Drop CSS Grid Generator",
  description: "La herramienta definitiva para forjar layouts de CSS Grid visualmente. Crea, arrastra, redimensiona y exporta código limpio.",
  keywords: ["CSS Grid", "Generator", "Frontend Tool", "Next.js", "Web Design"],
  authors: [{ name: "The Ribeor" }],
};

// Optimización para que en móviles no se pueda hacer zoom accidental al arrastrar
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#1E293B] selection:bg-blue-500/30`}
      >
        {children}
      </body>
    </html>
  );
}