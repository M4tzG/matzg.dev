import { Geist, Lacquer } from "next/font/google";
import Cursor from "./components/Cursor";
import "./globals.css";

import CanvasContainer from "./components/CanvasContainer";

const lacquer = Lacquer({
  variable: "--font-lacquer",
  subsets: ['latin'],
  weight: '400',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
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
        className={`${lacquer.variable} ${geistSans.variable} flex flex-col justify-center items-center min-h-screen antialiased font-lacquer text-foreground bg-gradient-to-br from-[#070806] to-[#1A1623]`}
      >
        <Cursor />
        <CanvasContainer />


        <main className="w-full relative z-10 flex-grow">
          {children}
        </main>


      </body>
    </html>
  );
}
