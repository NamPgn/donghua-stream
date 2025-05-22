import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SeriesProvider } from "@/contexts/SeriesContext"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Anime Streaming Platform",
  description: "Watch your favorite anime shows and movies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Providers>
        <SeriesProvider>
            <Header />
            {children}
            <Footer />
        </SeriesProvider>
          </Providers>
      </body>
    </html>
  );
}
