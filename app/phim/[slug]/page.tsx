import { notFound } from "next/navigation"
import { Metadata } from "next"
import { AnimeClient } from "../anime-client"
import { getAnimeData } from "@/services/anime.server";
import { Wrapper } from "@/components/wrapper";
import NominatedFilm from "@/app/xem-phim/_components/NominatedFilm";

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

    return {
      title,
      description,
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
        canonical: `/phim/${slug}`
      }
    }
}


export default async function AnimePage(  { params }: { params: tParams }) {
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
    </>

  )
}
