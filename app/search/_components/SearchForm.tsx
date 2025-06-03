import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchFormProps } from "../types/types"

export function SearchForm({
    searchQuery,
    onSearchChange,
    onSubmit,
    isLoading,
    onFilterClick,
}: SearchFormProps) {
    return (
        <form onSubmit={onSubmit} className="flex w-full max-w-full items-center space-x-2">
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Tìm kiếm anime..."
                    className="w-full pl-8"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Đang tìm..." : "Tìm kiếm"}
            </Button>
            <Button
                type="button"
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={onFilterClick}
            >
                <Filter className="h-4 w-4" />
                <span className="sr-only">Bộ lọc</span>
            </Button>
        </form>
    )
} 