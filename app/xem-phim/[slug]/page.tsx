import { notFound } from "next/navigation"
import { Metadata } from "next"
import { WatchClient } from "./watch-client"
import { getAnimeEpisode } from "@/services/anime.server"
import { ANIME_PATHS } from "@/constant/path.constant";

type tParams = Promise<{ slug: string }>;

export async function generateMetadata(
  { params }: { params: tParams }
): Promise<Metadata> {
  const { slug } = await params

  const animeData = await getAnimeEpisode(slug)
  if (!animeData) {
    return {
      title: 'Không tìm thấy',
      description: 'Không tìm thấy tập phim này'
    }
  }

  const title = `${animeData.category.isMovie === 'drama' ? animeData.name + ' - Tập ' + animeData.seri : animeData.name}`
  const description = animeData.category.des
const keywords = [
  title,
  `${title} Vietsub`,
  `${title} Lồng Tiếng`,
  `${title} Thuyết Minh`,
  `${title} phimmoi`,
  `${title} youtube`,
  `${title} full`,
  "hhninja",
  "hhkungfu",
  "hhpanda",
  "tvhay",
  "animehay",
  "vtvgiaitri",
      "hh3d",
      "hoathinh3d",
      "hh3dtq"
];
  return {
    title,
    description,
    keywords,
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

export default async function WatchPage({ params }: { params: tParams }) {
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
