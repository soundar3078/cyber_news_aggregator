'use client'; // Add 'use client' for useEffect and localStorage access

import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppLayout from "@/components/layout/app-layout";
import React, { useEffect } from 'react';

// Note: GeistSans and GeistMono are imported as objects.
// They are not functions to be called.
// Their 'variable' property contains the CSS custom property name.

// export const metadata: Metadata = { // Metadata should be defined in a server component or a static export
//   title: 'ThreatWatch',
//   description: 'Cyber Threat Aggregator Dashboard',
// };
// For client components, set title in useEffect or use a Head component if needed for specific pages.


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Set title dynamically for client component
    document.title = 'ThreatWatch';

    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      document.documentElement.className = storedTheme;
    } else {
      // Default to dark theme if no preference is stored
      document.documentElement.className = 'dark';
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  return (
    <html lang="en">
      {/*
        The className on <html> will be managed by useEffect for theme switching.
        Font CSS variables are applied to the body.
      */}
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-mono antialiased bg-background text-foreground`}>
        <AppLayout>{children}</AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
