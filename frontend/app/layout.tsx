import Nav from "@/components/nav";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ReduxProvider } from "@/redux/provider";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dynamic Art",
  description: "Dynamic Art app",
};

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import "@/public/js/fontawesome";
import "@/public/css/fonts1.css";
import "@/public/css/fonts2.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "@/public/css/bootstrap.min.css";
import "@/public/css/template.css";
import "@/public/css/globals.css";
import "@/public/css/main.css";

import Script from 'next/script';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // auth returns userId but we use adminId name for it.
  // because we use userId name for our users
  const { userId: adminId } : any = auth();

  return (
    <ClerkProvider
      publishableKey={process.env.CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body className={inter.className}>
        <ReduxProvider>
          <Nav title="Dynamic Art" adminId={adminId || ''}></Nav>
          <div className="pictures">
            <div className="children">
              {children}
            </div>
          </div>
          </ReduxProvider>
          <Script async src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></Script>
        </body>
      </html>
    </ClerkProvider>
  );
}
