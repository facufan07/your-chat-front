import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Chat",
  description: "Maybe you need to talk to yourself.",
  icons: "/favicon.ico",  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
