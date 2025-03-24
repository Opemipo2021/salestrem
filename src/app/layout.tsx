// 'use client'

import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";
import ReactQueryProvider from "@/providers/react-query-provider";
import ReduxProvider from "@/providers/redux-prodiver";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SaleStream",
  description: "Drive engagement and sales with SaleStream",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
   
      <body 
        suppressHydrationWarning
        className={jakarta.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <ReduxProvider>
             <ReactQueryProvider>{children}</ReactQueryProvider>
            </ReduxProvider>
          <Toaster />
        </ThemeProvider>
      </body>
      
    </html>
    </ClerkProvider>
  );
}

