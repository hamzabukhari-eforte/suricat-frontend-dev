import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppToaster } from "@/components/ui/AppToaster";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import "./globals.css";

const plusJakarta = localFont({
  src: "../public/assets/fonts/PlusJakartaSans-VariableFont_wght.ttf",
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: "200 800",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://suricat.ai"),
  title: {
    default: "Suricat | The Compliance Intelligence Platform",
    template: "%s | Suricat",
  },
  description:
    "Suricat is the Compliance Intelligence Platform for highly regulated industries — read-only by design, built for inspection-ready documentation confidence.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
  openGraph: {
    siteName: "Suricat",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale} className={`${plusJakarta.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col font-sans text-navy bg-white"
        suppressHydrationWarning
      >
        <LocaleProvider locale={locale} dictionary={dictionary}>
          {children}
          <AppToaster />
        </LocaleProvider>
      </body>
    </html>
  );
}
