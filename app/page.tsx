'use client'

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useAnime, useAnimePopular } from "@/hooks/useAnime"

import { AnimationCard } from "@/components/animation-card"
import { FeaturedSlider } from "@/components/featured-slider"
import Loading from "@/app/loading"

export default function HomePage() {
  const { data: animeData, isLoading } = useAnime();
  const { data: animePopular } = useAnimePopular()
  const animes = animeData?.data || []
  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-6 mx-auto">
        {/* Hero Section */}
        <section className="mb-12">
          <FeaturedSlider />
        </section>

        {/* New Releases Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold"> New Releases</h2>
            <Link href="/new" className="flex items-center text-sm text-primary hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
            {animes.slice(0, 12).map((anime) => (
              <AnimationCard key={anime._id} anime={anime} />
            ))}
          </div>
        </section>

        {/* Popular Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Popular</h2>
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

        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">动漫分类 Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["武侠", "仙侠", "玄幻", "科幻", "历史", "冒险"].map((category) => (
              <Link
                key={category}
                href={`/categories/${category}`}
                className="bg-muted hover:bg-muted/80 transition-colors rounded-lg p-4 text-center"
              >
                <div className="font-medium">{category}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
