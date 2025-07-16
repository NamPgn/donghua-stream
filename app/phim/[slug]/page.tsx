import { notFound } from "next/navigation"
import { Metadata } from "next"
import { AnimeClient } from "../anime-client"
import { getAnimeData } from "@/services/anime.server";
import { Wrapper } from "@/components/wrapper";
import NominatedFilm from "@/app/xem-phim/_components/NominatedFilm";
import { ANIME_PATHS } from "@/constant/path.constant";
import Script from "next/script";
type tParams = Promise<{ slug: string }>;
export async function generateMetadata(
  { params }: { params: tParams }
): Promise<Metadata> {
  const { slug } = await params

  const animeData = await getAnimeData(slug)

  if (!animeData) {
    return {
      title: 'Không tìm thấy',
      description: 'Không tìm thấy anime này'
    }
  }

  const title = `${animeData.name} - ${animeData.anotherName}`
  const description = animeData.des
  const imageUrl = animeData.linkImg
  const keywords = [
    animeData.name,
    `${animeData.name} Vietsub`,
    `${animeData.name} Lồng Tiếng`,
    `${animeData.name} Thuyết Minh`,
    `${animeData.name} phimmoi`,
    `${animeData.name} youtube`,
    `${animeData.name} full`,
    animeData.anotherName,
    `${animeData.anotherName} full`,
    `${animeData.name} hhninja`,
    `${animeData.name} hhkungfu`,
    `${animeData.name} hhpanda`,
    `${animeData.name} tvhay`,
    `${animeData.name} animehay`,
    "hh3d",
    "hoathinh3d",
    "hh3dtq"
  ];
  return {
    title,
    description,
    keywords,
     robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
    openGraph: {
      title,
      description,
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: title
      }],
      type: 'video.movie',
      siteName: 'Hoạt hình trung quốc Website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@your_twitter_handle'
    },
    alternates: {
      canonical: `${ANIME_PATHS.BASE}/${slug}`
    }
  }
}


export default async function AnimePage({ params }: { params: tParams }) {
  const { slug } = await params

  const animeData = await getAnimeData(slug)

  if (!animeData) {
    notFound()
  }

  return (
    <>
      <AnimeClient
        anime={animeData}
      />
      <Wrapper>
        <NominatedFilm seriesId={animeData?.relatedSeasons} categoryId={animeData?._id} />
      </Wrapper>
      <Script type="application/ld+json" id="movie-schema">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Movie",
          "name": animeData.name,
          "alternateName": animeData.anotherName,
          "description": animeData.des,
          "image": animeData.linkImg,
          "url": `https://hh3dtq.site/phim/${slug}`,
          "inLanguage": "vi",
          "potentialAction": {
            "@type": "WatchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `https://hh3dtq.site/phim/${slug}`,
              "actionPlatform": [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform"
              ]
            }
          }
        })}
      </Script>
    </>

  )
}
