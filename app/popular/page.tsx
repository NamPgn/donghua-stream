'use client'
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import MVImage from "@/components/ui/image"
import MVLink from "@/components/Link"
import { ANIME_PATHS } from "@/constant/path.constant"
import { useSeriesAllByActive } from "@/hooks/useSeries"

interface Anime {
  id: string
  slug: string
  name: string
  anotherName: string
  linkImg: string
  up: number
  episodes?: number
  categories?: string[]
}

interface Category {
  name: string
  slug: string
  categories: Anime[]
}

export default function PopularPage() {
  // Sort animes by rating (highest first)
  const { data: dataSeries } = useSeriesAllByActive();
  return (
    <div className="min-h-screen bg-background">
      <main className="container py-8 mx-auto px-2 md:px-0">
        <div className="flex items-center gap-2 mb-6">
          <MVLink href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Button>
          </MVLink>
          <h1 className="text-3xl font-bold">Phổ Biến</h1>
        </div>

        <div className="mb-6">
          <p className="text-muted-foreground">Danh sách được sắp xếp theo đánh giá</p>
        </div>

        <div className="space-y-12">
          {/* Top 5 Most Popular */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Xếp Hạng Cao Nhất</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataSeries?.categoryTopRate.map((anime: Anime, index: number) => (
                <MVLink key={anime.slug} href={`${ANIME_PATHS.BASE}/${anime.slug}`} className="group">
                  <div className="relative h-[200px] rounded-lg overflow-hidden">
                    <div className="absolute inset-0">
                      <MVImage
                        src={anime.linkImg}
                        alt={anime.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        width={600}
                        height={600}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <div className="absolute top-2 left-2 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <div className="text-white text-lg font-bold mb-1">{anime.name}</div>
                      <div className="text-white/80 text-sm">{anime.anotherName}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">
                          {anime.up}/1000
                        </div>
                      </div>
                    </div>
                  </div>
                </MVLink>
              ))}
            </div>
          </section>

          {/* Popular by Category */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Phổ Biến Theo Thể Loại</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {dataSeries?.seasons?.map((category: Category) => {
                return (
                  <div key={category.slug}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                      <MVLink href={`/categories/${category.slug}`} className="text-sm text-primary hover:underline">
                        Xem Tất Cả
                      </MVLink>
                    </div>
                    <div className="space-y-3">
                      {category.categories.map((anime: Anime, index: number) => (
                        <MVLink key={anime.id} href={`${ANIME_PATHS.BASE}/${anime.id}`}>
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="font-medium text-muted-foreground w-5 text-center">{index + 1}</div>
                            <div className="relative h-16 w-12 overflow-hidden rounded">
                              <MVImage
                                width={200}
                                height={200}
                                src={anime.linkImg}
                                alt={anime.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">{anime.name}</h4>
                              <p className="text-sm text-muted-foreground truncate">{anime.anotherName}</p>
                            </div>
                            <div className="bg-yellow-500/10 text-yellow-600 text-xs font-bold px-2 py-0.5 rounded">
                              {anime.up}
                            </div>
                          </div>
                        </MVLink>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
