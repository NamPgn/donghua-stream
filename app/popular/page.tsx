import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { animeData } from "@/lib/data"
import MVImage from "@/components/ui/image"

export default function PopularPage() {
  // Sort animes by rating (highest first)
  const popularAnimes = [...animeData].sort((a, b) => b.rating - a.rating)

  return (
    <div className="min-h-screen bg-background">
 

      <main className="container py-8 mx-auto px-2 md:px-0">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
             Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold"> Popular Anime</h1>
        </div>

        <div className="mb-6">
          <p className="text-muted-foreground">按评分排序的最受欢迎动漫作品</p>
        </div>

        <div className="space-y-12">
          {/* Top 5 Most Popular */}
          <section>
            <h2 className="text-2xl font-bold mb-6">最受欢迎 Top Rated</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularAnimes.slice(0, 3).map((anime, index) => (
                <Link key={anime.id} href={`/q/${anime.id}`} className="group">
                  <div className="relative h-[200px] rounded-lg overflow-hidden">
                    <div className="absolute inset-0">
                      <MVImage
                        src={anime.coverImage}
                        alt={anime.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <div className="absolute top-2 left-2 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <div className="text-white text-lg font-bold mb-1">{anime.title}</div>
                      <div className="text-white/80 text-sm">{anime.chineseTitle}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">
                          {anime.rating}/10
                        </div>
                        <div className="text-white/80 text-xs">
                          {anime.episodes}集 | {anime.categories[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* All Popular Anime */}
          <section>
            <h2 className="text-2xl font-bold mb-6">所有热门动漫 All Popular Anime</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {/* <AnimationCard  /> */}
            </div>
          </section>

          {/* Popular by Category */}
          <section>
            <h2 className="text-2xl font-bold mb-6">按类别热门 Popular by Category</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {["武侠", "仙侠", "科幻", "奇幻"].map((category) => {
                const categoryAnimes = animeData
                  .filter((anime) => anime.categories.includes(category))
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 4)

                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">{category}</h3>
                      <Link href={`/categories/${category}`} className="text-sm text-primary hover:underline">
                        查看全部 View All
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {categoryAnimes.map((anime, index) => (
                        <Link key={anime.id} href={`/q/${anime.id}`}>
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="font-medium text-muted-foreground w-5 text-center">{index + 1}</div>
                            <div className="relative h-16 w-12 overflow-hidden rounded">
                              <MVImage
                                src={anime.image}
                                alt={anime.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">{anime.title}</h4>
                              <p className="text-sm text-muted-foreground truncate">{anime.chineseTitle}</p>
                            </div>
                            <div className="bg-yellow-500/10 text-yellow-600 text-xs font-bold px-2 py-0.5 rounded">
                              {anime.rating}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container py-8 mx-auto px-2 md:px-0">
          <div className="text-center text-sm text-muted-foreground">
            &copy; 2025 动漫天地 AnimeWorld. 保留所有权利。
          </div>
        </div>
      </footer>
    </div>
  )
}
