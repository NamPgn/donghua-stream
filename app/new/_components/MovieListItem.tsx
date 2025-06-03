import Image from "next/image"
import Link from "next/link"
import { Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

interface MovieListItemProps {
  movie: Movie
}

export function MovieListItem({ movie }: MovieListItemProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-card to-card/80 border-0 shadow-md">
      <CardContent className="p-0">
        <div className="flex gap-0">
          <div className="relative w-24 h-32 flex-shrink-0 overflow-hidden">
            <Image
              src={movie.linkImg || "/placeholder.svg?height=128&width=96"}
              alt={movie.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="96px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="flex-1 p-4 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <Link href={`/movie/${movie.slug}`} className="block flex-1 min-w-0">
                <h3 className="font-bold text-base line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight">
                  {movie.name}
                </h3>
              </Link>
              <Badge className="ml-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0 text-xs">
                {movie.year || "N/A"}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{movie.year || "N/A"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{movie.time || "Chưa rõ"}</span>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium text-xs">HD</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
              >
                Xem ngay
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 