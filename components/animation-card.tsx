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
            <div className="absolute top-2 right-2 flex gap-1.5">
              <Badge
                variant={anime.isMovie !== "drama" && anime.isMovie !== undefined ? "default" : "secondary"}
                className="text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5"
              >
                {anime.isMovie === "drama" 
                  ? (anime.products && anime.products.length > 0 ? `Tập ${anime.products[0].seri}` : "...")
                  : "Movie"
                }
              </Badge>
              {anime.quality && anime.quality !== "undefined" && (
                <Badge variant="outline" className="bg-black/50 text-white border-white/30 text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5">
                  {anime.quality}
                </Badge>
              )}
            </div>
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
          <h3 className="font-medium text-xs sm:text-sm line-clamp-1 mb-0.5">{anime.name}</h3>
          <p className="text-[10px] sm:text-[11px] text-muted-foreground line-clamp-1 mb-1 sm:mb-1.5">{anime.anotherName ? anime.anotherName : '?'}</p>
        </MVLink>
      </CardContent>
    </Card>
  )
}
