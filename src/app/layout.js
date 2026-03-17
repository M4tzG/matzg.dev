import { Geist, Geist_Mono } from "next/font/google";
import Cursor from "./components/Cursor";
import "./globals.css";

import CanvasContainer from "./components/CanvasContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "meu site",
  description: "meu site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Cursor />
        <CanvasContainer />
        {children}
      </body>
    </html>
  );
}
