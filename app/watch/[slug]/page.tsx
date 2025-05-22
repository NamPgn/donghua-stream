import { notFound } from "next/navigation"
import { WatchClient } from "./watch-client"
import { getAnimeEpisode } from "@/services/anime.server"

interface PageProps {
  params: Promise<{ slug: string }>
}



export default async function WatchPage({ params }: PageProps) {
  const { slug } = await params

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