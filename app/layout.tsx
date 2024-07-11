import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
// import PageTransition from "@/components/PageTransition";
// import StairTransition from "@/components/StairTransition";
import Head from "next/head";

const jetBrainsMono = Cinzel({
  subsets: ["latin"],
  weight: ["400","500","600", "700"],
  variable: "--font-jetbrainsMono",
});

export const metadata: Metadata = {
  title: "BlooCodeTech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jetBrainsMono.variable}>
        <Header />
        {/* <StairTransition /> */}
        {/* <PageTransition>{children}</PageTransition> */}
        {children}
      </body>
    </html>
  );
}
