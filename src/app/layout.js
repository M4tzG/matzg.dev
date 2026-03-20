import { Geist, Geist_Mono, Lacquer } from "next/font/google";
import Cursor from "./components/Cursor";
import "./globals.css";

import CanvasContainer from "./components/CanvasContainer";

const lacquer = Lacquer({
  subsets: ['latin'],
  variable: "--font-lacquer",
  weight: '400',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "m4tzg.dev",
  description: "meu site",
};

export default function RootLayout({ children }) {
  return (
    <html lang={process.env.LOCALE || 'pt-BR'}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lacquer.variable} flex justify-center antialiased`}
      >
        <Cursor />
        <CanvasContainer />
        {children}
      </body>
    </html>
  );
}
