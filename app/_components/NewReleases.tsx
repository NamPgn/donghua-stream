'use client'
import { ArrowRight, History } from "lucide-react"
import { useAnime } from "@/hooks/useAnime"
import { AnimationCard } from "@/components/animation-card"
import Loading from "@/app/loading"
import MVLink from "@/components/Link"

export function NewReleases() {
  const { data: animeData, isLoading } = useAnime();
  const animes = animeData?.data || []

  if (isLoading) {
    return <Loading />
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <History className="w-6 h-6 text-blue-500" />
          Mới cập nhật
        </h2>
        <MVLink href="/new" className="flex items-center text-sm text-primary hover:underline">
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </MVLink>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
        {animes.map((anime) => (
          <AnimationCard key={anime._id} anime={anime} />
        ))}
      </div>
    </section>
  )
} 