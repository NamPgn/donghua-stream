"use client"

import Image from "next/image"
import Link from "next/link"
import { Trash2, Eye, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useWatchlistStore } from "@/store/watchlist"
import { ANIME_PATHS } from "@/constant/path.constant"

export function FavoritesList() {
  const { animes, removeAnime } = useWatchlistStore()

  const handleRemoveAll = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tất cả phim đã lưu?")) {
      animes.forEach(anime => removeAnime(anime._id))
    }
  }

  const ListView = () => (
    <div className="space-y-3">
      {animes.map((anime) => (
        <Card key={anime._id} className="group overflow-hidden hover:shadow-md transition-all duration-300 border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-14 overflow-hidden rounded-lg flex-shrink-0">
                <Image 
                  src={anime.linkImg} 
                  alt={anime.name} 
                  fill 
                  className="object-cover transition-transform duration-300 group-hover:scale-105" 
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base mb-1 truncate group-hover:text-primary transition-colors">
                  {anime.name}
                </h3>
                {anime.anotherName && (
                  <p className="text-sm text-muted-foreground truncate mb-2">
                    {anime.anotherName}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <Heart className="h-3 w-3 mr-1 fill-current" />
                    Đã lưu
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <Link href={`${ANIME_PATHS.BASE}/${anime.slug}`}>
                  <Button size="sm" variant="outline" className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Eye className="h-4 w-4" />
                    Xem phim
                  </Button>
                </Link>
                <Button
                  onClick={() => removeAnime(anime._id)}
                  size="sm"
                  variant="ghost"
                  className="gap-2 text-destructive hover:text-destructive-foreground hover:bg-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Xóa
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold">Phim đã lưu</h1>
            <p className="text-sm text-muted-foreground">
              {animes.length} phim trong danh sách yêu thích của bạn
            </p>
          </div>
        </div>

        {animes.length > 0 && (
          <Button
            onClick={handleRemoveAll}
            variant="outline"
            size="sm"
            className="gap-2 text-destructive hover:text-destructive-foreground hover:bg-destructive border-destructive"
          >
            <Trash2 className="h-4 w-4" />
            Xóa tất cả
          </Button>
        )}
      </div>

      {/* Content */}
      <ListView />
    </div>
  )
}