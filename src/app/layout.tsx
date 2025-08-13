import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import { LanguageProvider } from "./i18n/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gokart Klub – Következő verseny és regisztráció",
  description:
    "Regisztrálj a következő gokart versenyre, nézd meg az eredményeket és a legfontosabb infókat!",
  openGraph: {
    title: "Gokart Klub",
    description: "Regisztrálj a következő gokart versenyre!",
    url: process.env.SITE_URL || "https://lamerzoli.vercel.app",
    images: [
      {
        url: "/public/next.svg",
        width: 1200,
        height: 630,
        alt: "Gokart verseny",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gokart Klub",
    description: "Regisztrálj a következő gokart versenyre!",
    images: ["/public/next.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: process.env.SITE_URL || "https://lamerzoli.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-white text-black antialiased`}>
        <LanguageProvider>
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
