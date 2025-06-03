"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Wrapper } from "@/components/wrapper"
import MVLink from "@/components/Link"
import { SearchForm } from "./_components/SearchForm"
import { SearchFilters } from "./_components/SearchFilters"
import { SearchResults } from "./_components/SearchResults"
import { useTags } from "@/hooks/useTags"
import { useSearchAnime } from "@/hooks/useAnime"
import type { Category } from "./types/types"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const { data: categoriesResponse } = useTags()
  const { data: searchResults, isLoading } = useSearchAnime(searchQuery, {
    categories: selectedCategories,
    status: statusFilter
  })

  const categories = (categoriesResponse as unknown as Category[]) || []
  const results = Array.isArray(searchResults) ? searchResults : []

  useEffect(() => {
    const query = searchParams.get("q")
    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const url = new URL(window.location.href)
    url.searchParams.set("q", searchQuery)
    window.history.pushState({}, "", url.toString())
  }

  const handleCategoryChange = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId]
    
    setSelectedCategories(newCategories)
    
    const url = new URL(window.location.href)
    if (newCategories.length > 0) {
      url.searchParams.set("categories", newCategories.join(","))
    } else {
      url.searchParams.delete("categories")
    }
    window.history.pushState({}, "", url.toString())
  }

  const handleStatusChange = (status: string) => {
    const newStatus = status === statusFilter ? "" : status
    setStatusFilter(newStatus)
    
    // Update URL with new status
    const url = new URL(window.location.href)
    if (newStatus) {
      url.searchParams.set("status", newStatus)
    } else {
      url.searchParams.delete("status")
    }
    window.history.pushState({}, "", url.toString())
  }

  const handleClearFilters = () => {
    setSelectedCategories([])
    setStatusFilter("")
    
    // Clear filter parameters from URL
    const url = new URL(window.location.href)
    url.searchParams.delete("categories")
    url.searchParams.delete("status")
    window.history.pushState({}, "", url.toString())
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
          <div className="hidden md:block">
            <SearchFilters
              categories={categories}
              selectedCategories={selectedCategories}
              statusFilter={statusFilter}
              onCategoryChange={handleCategoryChange}
              onStatusChange={handleStatusChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          <div className="space-y-6">
            {/* Search Form */}
            <SearchForm
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSubmit={handleSearchSubmit}
              isLoading={isLoading}
              onFilterClick={() => setShowFilters(!showFilters)}
            />

            {/* Mobile Filters */}
            <div className="md:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md"
              >
                {showFilters ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
              </button>
              {showFilters && (
                <div className="mt-4">
                  <SearchFilters
                    categories={categories}
                    selectedCategories={selectedCategories}
                    statusFilter={statusFilter}
                    onCategoryChange={handleCategoryChange}
                    onStatusChange={handleStatusChange}
                    onClearFilters={handleClearFilters}
                  />
                </div>
              )}
            </div>

            {/* Search Results */}
            <SearchResults
              results={results}
              isLoading={isLoading}
            />
          </div>
        </div>
      </Wrapper>
    </div>
  )
}
