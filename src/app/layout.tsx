import type { Metadata, Viewport } from "next";
import { Allura, Fraunces, Inter } from "next/font/google";
import { SITE_URL } from "@/data/site";
import { MotionProvider } from "@/components/motion";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const allura = Allura({ variable: "--font-allura", subsets: ["latin"], weight: "400", display: "swap" });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Platter Cafe & Restro, Jaipur | Coffee, Food & Menu", template: "%s | Platter Cafe & Restro" },
  description: "Platter at Rajasthan International Centre, JLN Marg, Jaipur. Coffee, breakfast, pizza, pasta, Indian mains and desserts. Open every day 11 AM to 10:30 PM.",
  applicationName: "Platter",
  keywords: ["cafe in Jaipur", "restaurant Jhalana", "Platter Cafe", "coffee Jaipur", "Rajasthan International Centre cafe"],
  openGraph: { type: "website", siteName: "Platter Cafe & Restro", locale: "en_IN", url: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf6ef" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1816" },
  ],
};

// Applies the saved theme before first paint so the page never flashes the wrong colours.
const THEME_SCRIPT = `try{var t=localStorage.getItem("platter.theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${fraunces.variable} ${allura.variable} h-full antialiased`}>
      <head><script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} /></head>
      <body className="min-h-full flex flex-col">
        <MotionProvider>
          <div data-template="expressive" className="contents">
            <SiteHeader />
            <div id="content" className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
