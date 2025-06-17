import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SeriesProvider } from "@/contexts/SeriesContext"
import { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  title: {
    default: "Hoạt hình trung quốc - Xem phim hoạt hình trung quốc mới nhất",
    template: "%s | Hoạt hình trung quốc"
  },
  description: "Xem phim hoạt hình trung quốc mới nhất, chất lượng cao, cập nhật nhanh chóng. Thưởng thức các bộ phim hoạt hình trung quốc hay nhất với phụ đề tiếng Việt.",
  keywords: ["hoạt hình trung quốc", "phim hoạt hình", "anime trung quốc", "donghua", "xem phim online"],
  authors: [{ name: "PH ANG" }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    siteName: "Hoạt hình trung quốc",
    title: "Hoạt hình trung quốc - Xem phim hoạt hình trung quốc mới nhất",
    description: "Xem phim hoạt hình trung quốc mới nhất, chất lượng cao, cập nhật nhanh chóng. Thưởng thức các bộ phim hoạt hình trung quốc hay nhất với phụ đề tiếng Việt.",
    images: [
      {
        url: "https://res.cloudinary.com/daz3lejjo/image/upload/f_webp/v1732691384/hoa-giang-ho-chi-bat-luong-nhan-phan-6-2-1_qkxcfi.jpg",
        width: 1200,
        height: 630,
        alt: "Hoạt hình trung quốc"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoạt hình trung quốc - Xem phim hoạt hình trung quốc mới nhất",
    description: "Xem phim hoạt hình trung quốc mới nhất, chất lượng cao, cập nhật nhanh chóng. Thưởng thức các bộ phim hoạt hình trung quốc hay nhất với phụ đề tiếng Việt.",
    images: ["/og-image.jpg"],
    creator: "@your_twitter_handle"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: `${process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}`,
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
  },
  category: 'entertainment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
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
