import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import Container from "@/components/container";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";
import "katex/dist/katex.min.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ["latin"] });
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Ali Ahad",
  description: "Personal website.",
  icons:"/images/logo.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${merriweather.className} bg-[#fafaf8] dark:bg-gray-900 text-zinc-900 dark:text-zinc-100 min-h-screen`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Container>
            <Header />
            {children}
            <Analytics />
            <SpeedInsights />
            <Footer />
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
