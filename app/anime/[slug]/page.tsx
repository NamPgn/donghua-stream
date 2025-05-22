import { notFound } from "next/navigation"
import { AnimeClient } from "../anime-client"
import { getAnimeData } from "@/services/anime.server";
import NominatedFilm from "@/app/watch/_components/NominatedFilm";
import { Wrapper } from "@/components/wrapper";

// interface PageProps {
//   params: {
//     slug: string
//   }
//   searchParams?: { [key: string]: string | string[] | undefined }
// }
// export async function generateMetadata(
//   { params }: PageProps
// ): Promise<Metadata> {
//   const { slug } = params

//   try {
//     const animeData = await getAnimeData(slug)

//     if (!animeData) {
//       return {
//         title: 'Không tìm thấy',
//         description: 'Không tìm thấy anime này'
//       }
//     }

//     return {
//       title: `${animeData.name} - ${animeData.anotherName}`,
//       description: animeData.des,
//       openGraph: {
//         title: `${animeData.name} - ${animeData.anotherName}`,
//         description: animeData.des,
//         images: [animeData.linkImg],
//         type: 'video.movie',
//       },
//       twitter: {
//         card: 'summary_large_image',
//         title: `${animeData.name} - ${animeData.anotherName}`,
//         description: animeData.des,
//         images: [animeData.linkImg],
//       }
//     }
//   } catch (error) {
//     console.error('Error generating metadata:', error)
//     return {
//       title: 'Lỗi',
//       description: 'Đã xảy ra lỗi khi tải trang'
//     }
//   }
// }

type tParams = Promise<{ slug: string }>;

export default async function AnimePage({ params }: { params: tParams }) {
  const { slug } = await params

  try {
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
  } catch (error) {
    console.error('Error in AnimePage:', error)
    notFound()
  }
}
