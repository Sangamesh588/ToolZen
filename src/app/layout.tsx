
import Script from "next/script";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  other: {
  "google-adsense-account": "ca-pub-7244024145280038",
},
  metadataBase: new URL("https://ToolGen.app"),
  title: {
    default: "ToolGen - 100% Free Online Tools & Calculators Platform",
    template: "%s | ToolGen",
  },
  description:
    "Free, fast, and mobile-friendly online tools platform. Calculate CGPA, estimate EMI, compress images, merge PDFs, generate QR codes, and convert units directly in your browser with zero latency.",
  keywords: [
    "online tools",
    "free calculators",
    "cgpa calculator",
    "image compressor",
    "merge pdf",
    "emi calculator",
    "qr code generator",
    "percentage calculator",
    "unit converter",
    "productivity tools",
  ],
  authors: [{ name: "ToolGen Engineering" }],
  creator: "ToolGen",
  publisher: "ToolGen",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ToolGen.app",
    siteName: "ToolGen",
    title: "ToolGen - 100% Free Online Tools & Calculators Platform",
    description:
      "High-speed browser-based utilities: CGPA, EMI, Image Compressor, PDF Merger, QR Codes, and Unit Converters.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolGen - Free Online Tools Platform",
    description:
      "All your favorite daily calculators, image tools, and converters in one fast, private platform.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#070a12] text-slate-100 selection:bg-sky-500 selection:text-white antialiased">
        <AppProvider>
          <Navbar />
          <CommandPalette />
          <main className="flex-1">{children}</main>
          <Footer />
</AppProvider>

<Script
  async
  strategy="afterInteractive"
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7244024145280038"
  crossOrigin="anonymous"
/>
      </body>
    </html>
  );
}

