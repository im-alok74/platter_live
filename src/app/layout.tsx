import type { Metadata, Viewport } from "next";
import { Antonio, Archivo } from "next/font/google";
import { SITE_URL } from "@/data/site";
import { MotionProvider } from "@/components/motion";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], display: "swap" });
const antonio = Antonio({ variable: "--font-antonio", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Platter Cafe & Restro, Jaipur | Coffee, Food & Menu", template: "%s | Platter Cafe & Restro" },
  description: "Platter at Rajasthan International Centre, JLN Marg, Jaipur. Coffee, breakfast, pizza, pasta, Indian mains and desserts. Open every day 11 AM to 10:30 PM.",
  applicationName: "Platter",
  keywords: ["cafe in Jaipur", "restaurant Jhalana", "Platter Cafe", "coffee Jaipur", "Rajasthan International Centre cafe"],
  openGraph: { type: "website", siteName: "Platter Cafe & Restro", locale: "en_IN", url: "/" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#1a0f0a" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${archivo.variable} ${antonio.variable} h-full antialiased`}>
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
