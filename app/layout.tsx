import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Turizm.ge - Your Guide to Georgia",
  description: "Discover the beauty of Georgia, from its ancient monasteries to its vibrant cities. Plan your perfect trip with our expert guides and tips.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Turizm.ge - Your Guide to Georgia",
    description: "Discover the beauty of Georgia, from its ancient monasteries to its vibrant cities. Plan your perfect trip with our expert guides and tips.",
    url: "https://turizm.ge",
    siteName: "turizm.ge",
    images: [
      {
        url: "https://i.ibb.co/MD9TXLQF/turizm.webp",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Turizm.ge - Your Guide to Georgia",
    description: "Discover the beauty of Georgia, from its ancient monasteries to its vibrant cities. Plan your perfect trip with our expert guides and tips.",
    creator: "@turizm_ge",
    images: ["https://i.ibb.co/MD9TXLQF/turizm.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
