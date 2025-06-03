import type { Anime } from "@/services/api/anime.api"

export interface Category {
    _id: string
    name: string
    slug: string
}

export interface SearchFilters {
    categories: string[]
    status: string
}

export interface SearchFormProps {
    searchQuery: string
    onSearchChange: (value: string) => void
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    isLoading: boolean
    onFilterClick: () => void
}

export interface SearchFiltersProps {
    categories: Category[]
    selectedCategories: string[]
    statusFilter: string
    onCategoryChange: (categoryId: string) => void
    onStatusChange: (status: string) => void
    onClearFilters: () => void
}

export interface SearchResultsProps {
    results: Anime[]
    isLoading?: boolean
}

export interface ApiResponse<T> {
    data: T
    status: number
    statusText: string
} 