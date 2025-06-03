import Image from "next/image"
import { Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import MVLink from "@/components/Link"
import { ANIME_PATHS } from "@/constant/path.constant"

interface Movie {
  _id: string
  name: string
  slug: string
  linkImg: string
  year: string
  time: string
  isActive?: number
  products?: Array<{ _id: string; seri: string }>
  week?: string
}

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-card to-card/80 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={movie.linkImg || "/placeholder.svg?height=400&width=300"}
          alt={movie.name}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg backdrop-blur-sm border-0 font-semibold">
            {movie.year || "N/A"}
          </Badge>
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/90 text-xs">
              <Clock className="h-3 w-3" />
              <span className="font-medium">{movie.time || "Chưa rõ"}</span>
            </div>

            <MVLink href={`${ANIME_PATHS.BASE}/${movie.slug}`}>
              <Button
                size="sm"
                className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300"
                variant="outline"
              >
                Xem ngay
              </Button>
            </MVLink>
          </div>
        </div>
      </div>

      <CardContent className="p-4 bg-gradient-to-br from-card to-muted/20">
        <MVLink href={`${ANIME_PATHS.BASE}/${movie.slug}`} className="block group-hover:text-primary transition-colors duration-300">
          <h3 className="font-bold text-sm line-clamp-2 leading-tight mb-2 group-hover:text-primary transition-colors duration-300">
            {movie.name}
          </h3>
        </MVLink>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{movie.year}</span>
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-medium">HD</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 