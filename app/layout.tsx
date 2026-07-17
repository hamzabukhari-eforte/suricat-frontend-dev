import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppToaster } from "@/components/ui/AppToaster";
import "./globals.css";

const plusJakarta = localFont({
  src: "../public/assets/fonts/PlusJakartaSans-VariableFont_wght.ttf",
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: "200 800",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://suricat.com"),
  title: {
    default: "Suricat | The Compliance Intelligence Platform",
    template: "%s | Suricat",
  },
  description:
    "Suricat is the Compliance Intelligence Platform for highly regulated industries — read-only by design, built for inspection-ready documentation confidence.",
  openGraph: {
    siteName: "Suricat",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col font-sans text-navy bg-white"
        suppressHydrationWarning
      >
        {children}
        <AppToaster />
      </body>
    </html>
  );
}
