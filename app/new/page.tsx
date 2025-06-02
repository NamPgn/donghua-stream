"use client"

import { useState, useMemo, useEffect } from "react"
import { ArrowLeft, Calendar, Clock, Filter, Grid, List, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAnimeCategory } from "@/hooks/useAnime"
import Link from "next/link"
import Image from "next/image"
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

export default function NewReleasesClient() {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const { data, isLoading, error } = useAnimeCategory(page)

  const movies: Movie[] = data?.data || []

  const availableYears = useMemo(() => {
    const years = [...new Set(movies.map((movie) => movie.year))]
      .filter(Boolean)
      .sort((a, b) => Number.parseInt(b) - Number.parseInt(a))
    return years
  }, [movies])

  const filteredAndSortedMovies = useMemo(() => {
    const filtered = movies.filter((movie) => {
      const matchesSearch = movie.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesYear = selectedYear === "all" || movie.year === selectedYear
      const isActiveMovie = movie.isActive
      return matchesSearch && matchesYear && isActiveMovie
    })

    // Sort movies
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => Number.parseInt(b.year || "0") - Number.parseInt(a.year || "0"))
        break
      case "oldest":
        filtered.sort((a, b) => Number.parseInt(a.year || "0") - Number.parseInt(b.year || "0"))
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    return filtered
  }, [movies, searchTerm, selectedYear, sortBy])

  // Reset filters when page changes
  useEffect(() => {
    setSearchTerm("")
    setSelectedYear("all")
  }, [page])

  const MovieCard = ({ movie }: { movie: Movie }) => (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-card to-card/80 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={movie.linkImg || "/placeholder.svg?height=400&width=300"}
          alt={movie.name}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "/placeholder.svg?height=400&width=300"
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Year Badge */}
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg backdrop-blur-sm border-0 font-semibold">
            {movie.year || "N/A"}
          </Badge>
        </div>

        {/* Hover Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/90 text-xs">
              <Clock className="h-3 w-3" />
              <span className="font-medium">{movie.time || "Chưa rõ"}</span>
            </div>

            <MVLink href={`${ANIME_PATHS.BASE}/${movie.slug}`} > <Button
              size="sm"
              className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300"
              variant="outline"
            >
              Xem ngay
            </Button></MVLink>
          </div>
        </div>
      </div>

      <CardContent className="p-4 bg-gradient-to-br from-card to-muted/20">
        <Link href={`/movie/${movie.slug}`} className="block group-hover:text-primary transition-colors duration-300">
          <h3 className="font-bold text-sm line-clamp-2 leading-tight mb-2 group-hover:text-primary transition-colors duration-300">
            {movie.name}
          </h3>
        </Link>

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

  const MovieListItem = ({ movie }: { movie: Movie }) => (
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
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=128&width=96"
              }}
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

  const LoadingSkeleton = () => (
    <div
      className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" : "grid-cols-1"
        }`}
    >
      {Array.from({ length: 24 }).map((_, i) => (
        <Card key={i} className="overflow-hidden bg-gradient-to-br from-card to-muted/20 border-0 shadow-lg">
          {viewMode === "grid" ? (
            <>
              <div className="relative">
                <Skeleton className="aspect-[3/4] w-full" />
                <div className="absolute top-3 right-3">
                  <Skeleton className="h-5 w-12 rounded-full" />
                </div>
              </div>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-2/3 mb-3" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-8" />
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="p-0">
              <div className="flex gap-0">
                <Skeleton className="w-24 h-32 flex-shrink-0" />
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-5 w-12 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-1/2 mb-3" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-8 w-16 rounded" />
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )

  const Pagination = () => {
    const totalPages = data?.totalPages || 1

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button
          variant="outline"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1 || isLoading}
          size="sm"
        >
          Trước
        </Button>

        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (page <= 3) {
              pageNum = i + 1
            } else if (page >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = page - 2 + i
            }

            return (
              <Button
                key={pageNum}
                variant={pageNum === page ? "default" : "outline"}
                size="sm"
                onClick={() => setPage(pageNum)}
                disabled={isLoading}
                className="w-8 h-8 p-0"
              >
                {pageNum}
              </Button>
            )
          })}

          {totalPages > 5 && page < totalPages - 2 && (
            <>
              <span className="px-2 text-muted-foreground">...</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(totalPages)}
                disabled={isLoading}
                className="w-8 h-8 p-0"
              >
                {totalPages}
              </Button>
            </>
          )}
        </div>

        <Button
          variant="outline"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages || isLoading}
          size="sm"
        >
          Sau
        </Button>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-6 md:py-8">
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-2">Có lỗi xảy ra</h3>
              <p className="text-muted-foreground mb-4">Không thể tải dữ liệu phim. Vui lòng thử lại sau.</p>
              <Button onClick={() => window.location.reload()}>Tải lại trang</Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 cursor-pointer">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Quay lại</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-medium">Tất cả</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Tất cả phim được cập nhật hàng ngày
            </p>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-card rounded-lg border p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm phim..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Năm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả năm</SelectItem>
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      Năm {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="oldest">Cũ nhất</SelectItem>
                  <SelectItem value="name">Tên A-Z</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results info */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {isLoading
                ? "Đang tải..."
                : `Tìm thấy ${filteredAndSortedMovies.length} phim (Trang ${page}/${data?.totalPages || 1})`}
            </p>
            {!isLoading && <p className="text-sm text-muted-foreground">Tổng: {data?.totalCount || 0} phim</p>}
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : filteredAndSortedMovies.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Không tìm thấy phim nào</h3>
              <p className="text-muted-foreground mb-4">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedYear("all")
                  setSortBy("newest")
                }}
              >
                Xóa bộ lọc
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div
              className={`grid gap-4 ${viewMode === "grid"
                ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                : "grid-cols-1 max-w-4xl mx-auto"
                }`}
            >
              {filteredAndSortedMovies.map((movie) =>
                viewMode === "grid" ? (
                  <MovieCard key={movie._id} movie={movie} />
                ) : (
                  <MovieListItem key={movie._id} movie={movie} />
                ),
              )}
            </div>

            <Pagination />
          </>
        )}
      </main>
    </div>
  )
}
