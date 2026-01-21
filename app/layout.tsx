import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tuku Coffee | Awwwards Scrollytelling",
  description: "Experience the art of coffee with Tuku.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased bg-[#0a0a0a] text-white overflow-x-hidden`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
