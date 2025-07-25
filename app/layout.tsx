import type { Metadata } from "next";
import { Toaster } from 'sonner';
import NavBar from '@/components/NavBar';
import { ThemeProvider } from 'next-themes';
import { Suspense } from "react";
import Loader from "@/components/Loader";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Suspense fallback={<Loader />}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NavBar />
            <main className="min-h-screen">{children}</main>
            <Toaster position="top-right"/>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
