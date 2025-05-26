import { notFound } from "next/navigation"
import { Metadata } from "next"
import { WatchClient } from "./watch-client"
import { getAnimeEpisode } from "@/services/anime.server"
import { ANIME_PATHS } from "@/constant/path.constant";

type tParams = Promise<{ slug: string }>;

export async function generateMetadata(
  { params }: { params: tParams }
): Promise<Metadata> {
  const { slug } = await  params

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
        canonical: `${ANIME_PATHS.WATCH}/${slug}`
      }
    }
}

export default async function WatchPage( { params }: { params: tParams }) {
  const { slug } = await params

  const animeData = await getAnimeEpisode(slug)
  if (!animeData) {
    notFound()
  }
  return (
    <WatchClient
      anime={animeData}
    />
  )
}