'use client'
import { Clock, Calendar } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import MVImage from "./ui/image"
import MVLink from "./Link"
import { ANIME_PATHS } from "@/constant/path.constant"

interface AnimeProduct {
  _id: string;
  seri: string;
}

interface AnimeType {
  _id: string;
  name: string;
  anotherName: string;
  slug: string;
  linkImg: string;
  des: string;
  sumSeri: string;
  products: AnimeProduct[];
  type: string;
  year: string;
  time: string;
  quality: string;
  lang: string;
  isMovie: string;
  up: number;
  thuyetMinh?: boolean;
  newMovie?: boolean;
}

interface AnimationCardProps {
  anime: AnimeType
  showBadge?: boolean
}

export function AnimationCard({ anime, showBadge = true }: AnimationCardProps) {
  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md group">
      <MVLink href={`${ANIME_PATHS.BASE}/${anime.slug}`} >
        <div className="relative aspect-[3/4] overflow-hidden">
          <MVImage
            src={anime.linkImg || "/placeholder.svg"}
            alt={anime.name}
            fill
            sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw"
            className="object-cover transition-transform group-hover:scale-105"
            priority={false}
            loading="lazy"
          />
          {showBadge && (
            <div className="absolute top-2 right-2 flex flex-wrap gap-1.5">
              {/* Creative "NEW" indicator */}
              {anime.newMovie && (
                <div className="relative">
                  {/* Neon glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-pink-500 to-red-500 rounded-full blur-sm animate-pulse opacity-75" />
                  {/* Main indicator */}
                  <div className="relative bg-gradient-to-r from-red-500 to-pink-600 text-white text-[8px] sm:text-[9px] font-bold px-2 py-1 rounded-full shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                    <span className="flex items-center gap-0.5">
                      ✨ MỚI
                    </span>
                  </div>
                  {/* Sparkle effects */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-60" />
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white rounded-full animate-bounce opacity-80" />
                </div>
              )}
              
              {anime.products && anime.products.length > 0 && (
                <Badge
                  variant={anime.isMovie !== "drama" && anime.isMovie !== undefined ? "default" : "secondary"}
                  className="text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5"
                >
                  {anime.isMovie === "drama"
                    ? (anime.products && anime.products.length > 0 ? `Tập ${anime.products[0].seri}` : "")
                    : "Movie"
                  }
                </Badge>
              )}

              {anime.quality && anime.quality !== "undefined" && (
                <Badge variant="outline" className="bg-black/50 text-white border-white/30 text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5">
                  {anime.quality}
                </Badge>
              )}
            </div>
          )}
          
          {/* Enhanced glow + floating elements cho phim mới */}
          {anime.newMovie && (
            <>
              {/* Main glow ring */}
              <div className="absolute inset-0 ring-2 ring-red-500/40 ring-inset pointer-events-none animate-pulse" />
              {/* Corner sparkles */}
              <div className="absolute top-1 left-1 w-1 h-1 bg-yellow-300 rounded-full animate-ping" />
              <div className="absolute top-3 left-3 w-0.5 h-0.5 bg-white rounded-full animate-bounce" />
              <div className="absolute bottom-1 right-1 w-1 h-1 bg-pink-300 rounded-full animate-ping delay-300" />
              {/* Floating "NEW" text */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                <span className="text-6xl font-black text-white/30 transform rotate-45 select-none">
                  NEW
                </span>
              </div>
            </>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1.5 sm:p-2">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                <span className="text-[10px] sm:text-[11px]">{anime.time}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                <span className="text-[10px] sm:text-[11px]">{anime.year}</span>
              </div>
            </div>
          </div>
        </div>
      </MVLink>
      <CardContent className="p-2 sm:p-2.5">
        <MVLink href={`${ANIME_PATHS.BASE}/${anime.slug}`} className="hover:text-primary transition-colors">
          <div className="flex items-start justify-between gap-1">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-xs sm:text-sm line-clamp-1 mb-0.5">
                {anime.name}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-muted-foreground line-clamp-1 mb-1 sm:mb-1.5">
                {anime.anotherName ? anime.anotherName : '?'}
              </p>
            </div>
            {anime.newMovie && (
              <div className="relative flex-shrink-0">
                <div className="relative bg-gradient-to-r from-red-500 to-pink-500 text-white text-[7px] font-bold px-1.5 py-0.5 transform skew-x-12 shadow-md">
                  MỚI
                  <div className="absolute -right-1 top-0 w-0 h-0 border-l-[4px] border-l-red-600 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-12 animate-pulse" />
              </div>
            )}
          </div>
        </MVLink>
      </CardContent>
    </Card>
  )
}
