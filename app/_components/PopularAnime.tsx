'use client'
import Link from "next/link"
import { ArrowRight, Flame } from "lucide-react"
import { useAnimePopular } from "@/hooks/useAnime"
import { AnimationCard } from "@/components/animation-card"
import Loading from "@/app/loading"

export function PopularAnime() {
  const { data: animePopular, isLoading } = useAnimePopular();

  if (isLoading) {
    return <Loading />
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Flame className="w-6 h-6 text-red-500" />
          Thịnh Hành
        </h2>
        <Link href="/popular" className="flex items-center text-sm text-primary hover:underline">
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
        {animePopular?.data.slice(0, 12).map((anime) => (
          <AnimationCard key={anime._id} anime={anime} />
        ))}
      </div>
    </section>
  )
} 