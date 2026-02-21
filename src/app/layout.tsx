import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Islamic Council of Victoria | Peak Muslim Body of Victoria",
  description:
    "The Islamic Council of Victoria (ICV) is the peak Muslim body representing 270,000+ Victorian Muslims. Access services, report Islamophobia, find mosques, and stay informed.",
  keywords: [
    "Islamic Council of Victoria",
    "ICV",
    "Muslim Victoria",
    "Islamophobia support",
    "mosque finder",
    "Islamic services",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
