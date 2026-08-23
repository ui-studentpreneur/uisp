import type { Metadata } from "next";
import { Geist_Mono, Raleway } from "next/font/google";

import { AppProviders } from "@/components/providers";
import { clientEnv, siteConfig } from "@/config";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

/** Bound to `--font-sans`, which `@theme inline` maps onto the `font-sans` utility. */
const raleway = Raleway({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(clientEnv.siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.locale}
      className={cn("h-full", raleway.variable, geistMono.variable)}
    >
      <body className="flex min-h-full flex-col font-sans">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
