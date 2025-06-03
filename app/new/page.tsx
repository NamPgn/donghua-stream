"use client"

import { useState, useMemo, useEffect } from "react"
import { ArrowLeft, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAnimeCategory } from "@/hooks/useAnime"
import { MovieCard } from "./_components/MovieCard"
import { MovieListItem } from "./_components/MovieListItem"
import { LoadingSkeleton } from "./_components/LoadingSkeleton"
import { Pagination } from "./_components/Pagination"
import { Filters } from "./_components/Filters"
import { ViewMode } from "./_components/types"

export default function NewReleasesClient() {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")

  const { data, isLoading, error } = useAnimeCategory(page)

  const movies = useMemo(() => data?.data || [], [data?.data])

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
      return matchesSearch && matchesYear
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

        {/* Filters */}
        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          availableYears={availableYears}
          isLoading={isLoading}
          totalCount={data?.totalCount || 0}
          currentPage={page}
          totalPages={data?.totalPages || 1}
          filteredCount={filteredAndSortedMovies.length}
        />

        {/* Content */}
        {isLoading ? (
          <LoadingSkeleton viewMode={viewMode} />
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
              className={`grid gap-4 ${
                viewMode === "grid"
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

            <Pagination
              currentPage={page}
              totalPages={data?.totalPages || 1}
              isLoading={isLoading}
              onPageChange={setPage}
            />
          </>
        )}
      </main>
    </div>
  )
}
