import { Geist } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata = {
  title: "SevaConnect",
  description: "Connect, Participate and Make a Difference",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Navbar />
          {children}
          <Footer></Footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
