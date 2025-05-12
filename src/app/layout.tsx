
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppLayout from "@/components/layout/app-layout";

// Note: GeistSans and GeistMono are imported as objects.
// They are not functions to be called.
// Their 'variable' property contains the CSS custom property name.
// Subsets and variable names are typically pre-configured by the font loader.

export const metadata: Metadata = {
  title: 'ThreatWatch',
  description: 'Cyber Threat Aggregator Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      {/*
        Apply the font CSS variables to the body.
        GeistSans.variable might be something like '--font-geist-sans'
        GeistMono.variable might be something like '--font-geist-mono'
        The `font-mono` class from Tailwind will then use `var(--font-geist-mono)`.
        The default sans-serif font (if `font-sans` is used) will use `var(--font-geist-sans)`.
      */}
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-mono antialiased`}>
        <AppLayout>{children}</AppLayout>
        <Toaster />
      </body>
    </html>
  );
}

