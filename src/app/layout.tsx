import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, Lora } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WaxIdiotical",
    template: "%s | WaxIdiotical",
  },
  description: "Short films, 48 Hour Film Projects, theater montages, and more.",
  metadataBase: new URL("https://waxidiotical.com"),
  openGraph: {
    siteName: "WaxIdiotical",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable} ${lora.variable}`}>
      <body>
        <Nav />
        <main className="mx-auto min-h-screen max-w-6xl px-4 pb-16 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
