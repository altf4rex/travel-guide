import type { Metadata } from "next";
// import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Provider from "@/components/theme-provider";


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
      <body className="container bg-primaryLight dark:bg-primaryDark">
        <Provider>
          <Header />
          {children}
        </Provider>
        </body>
    </html>
  );
}
