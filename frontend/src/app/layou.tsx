import clsx from "clsx";
import { Inter } from "next/font/google";
import "./globals.css";
import { Viewport } from "next";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // eslint-disable-next-line jsx-a11y/html-has-lang
    <html>
      <body className={clsx(inter.className)}>{children}</body>
    </html>
  );
}
