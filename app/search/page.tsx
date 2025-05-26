"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, Search, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { AnimationCard } from "@/components/animation-card"
import { animeData } from "@/lib/data"
import { useSearchAnime } from "@/hooks/useAnime"
import type { Anime } from "@/services/api/anime.api"
import { Wrapper } from "@/components/wrapper"
import MVLink from "@/components/Link"

// Get all unique categories
const getAllCategories = () => {
  const categories = new Set<string>()
  animeData.forEach((anime) => {
    anime.categories.forEach((category) => {
      categories.add(category)
    })
  })
  return Array.from(categories).sort()
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const categories = getAllCategories()

  // Move the hook to component level
  const { data: searchResults, isLoading: isSearching } = useSearchAnime(searchQuery)
  useEffect(() => {
    // Get search query from URL if it exists
    const urlParams = new URLSearchParams(window.location.search)
    const query = urlParams.get("q")
    if (query) {
      setSearchQuery(query)
    }
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Update URL with search query
    const url = new URL(window.location.href)
    url.searchParams.set("q", searchQuery)
    window.history.pushState({}, "", url.toString())
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setStatusFilter(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Wrapper>
        <div className="flex items-center gap-2 mb-6">
          <MVLink href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Button>
          </MVLink>
          <h1 className="text-3xl font-bold">Tìm kiếm</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block space-y-6">
            <div className="rounded-lg border p-4">
              <h2 className="font-medium mb-4">Thể loại</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h2 className="font-medium mb-4">Trạng thái</h2>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="status-ongoing"
                    checked={statusFilter === "连载中"}
                    onCheckedChange={() => setStatusFilter(statusFilter === "连载中" ? null : "连载中")}
                  />
                  <label
                    htmlFor="status-ongoing"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Đang phát
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="status-completed"
                    checked={statusFilter === "完结"}
                    onCheckedChange={() => setStatusFilter(statusFilter === "完结" ? null : "完结")}
                  />
                  <label
                    htmlFor="status-completed"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Hoàn thành
                  </label>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={clearFilters}>
              Xóa bộ lọc
            </Button>
          </div>

          <div className="space-y-6">
            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="flex w-full max-w-full items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm anime..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={isSearching}>
                {isSearching ? "Đang tìm..." : "Tìm kiếm"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                <span className="sr-only">Bộ lọc</span>
              </Button>
            </form>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="md:hidden space-y-4 p-4 border rounded-lg">
                <h2 className="font-medium">Thể loại</h2>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <label
                        htmlFor={`mobile-category-${category}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>

                <h2 className="font-medium mt-4">Trạng thái</h2>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="mobile-status-ongoing"
                      checked={statusFilter === "连载中"}
                      onCheckedChange={() => setStatusFilter(statusFilter === "连载中" ? null : "连载中")}
                    />
                    <label
                      htmlFor="mobile-status-ongoing"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Đang phát
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="mobile-status-completed"
                      checked={statusFilter === "完结"}
                      onCheckedChange={() => setStatusFilter(statusFilter === "完结" ? null : "完结")}
                    />
                    <label
                      htmlFor="mobile-status-completed"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Hoàn thành
                    </label>
                  </div>
                </div>

                <Button variant="outline" className="w-full" onClick={clearFilters}>
                  Xóa bộ lọc
                </Button>
              </div>
            )}

            {/* Search Results */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Kết quả tìm kiếm{" "}
                <span className="text-muted-foreground font-normal">
                  ({Array.isArray(searchResults) ? searchResults.length : 0})
                </span>
              </h2>

              {Array.isArray(searchResults) && searchResults.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {searchResults.map((anime: Anime) => (
                    <AnimationCard
                      key={anime._id}
                      anime={anime}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Không tìm thấy anime nào</h3>
                  <p className="text-muted-foreground">
                    Vui lòng thử từ khóa khác hoặc xóa bộ lọc
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}
