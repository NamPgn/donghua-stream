import { notFound } from "next/navigation"
import { Metadata } from "next"
import { WatchClient } from "./watch-client"
import { getAnimeEpisode } from "@/services/anime.server"

interface PageProps {
  params: {
    slug: string
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = params

  try {
    const animeData = await getAnimeEpisode(slug)

    if (!animeData) {
      return {
        title: 'Không tìm thấy',
        description: 'Không tìm thấy tập phim này'
      }
    }

    const title = `${animeData.name} - Tập ${animeData.seri}`
    const description = animeData.category.des

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        siteName: 'Hoạt hình trung quốc Website',
        images: [{
          url: animeData.category.linkImg || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [animeData.category.linkImg || '/og-image.jpg']
      },
      alternates: {
        canonical: `/xem-phim/${slug}`
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Lỗi',
      description: 'Đã xảy ra lỗi khi tải trang'
    }
  }
}

export default async function WatchPage({ params }: PageProps) {
  const { slug } = params

  try {
    const animeData = await getAnimeEpisode(slug)
    if (!animeData) {
      notFound()
    }
    return (
        <WatchClient
          anime={animeData}
        />
    )
  } catch (error) {
    console.error('Error in WatchPage:', error)
    notFound()
  }
}