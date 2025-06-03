import { Search, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedYear: string
  onYearChange: (value: string) => void
  sortBy: string
  onSortChange: (value: string) => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
  availableYears: string[]
  isLoading: boolean
  totalCount: number
  currentPage: number
  totalPages: number
  filteredCount: number
}

export function Filters({
  searchTerm,
  onSearchChange,
  selectedYear,
  onYearChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  availableYears,
  isLoading,
  totalCount,
  currentPage,
  totalPages,
  filteredCount,
}: FiltersProps) {
  return (
    <div className="bg-card rounded-lg border p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm phim..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={selectedYear} onValueChange={onYearChange}>
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

          <Select value={sortBy} onValueChange={onSortChange}>
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
              onClick={() => onViewModeChange("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <p className="text-sm text-muted-foreground">
          {isLoading
            ? "Đang tải..."
            : `Tìm thấy ${filteredCount} phim (Trang ${currentPage}/${totalPages})`}
        </p>
        {!isLoading && <p className="text-sm text-muted-foreground">Tổng: {totalCount} phim</p>}
      </div>
    </div>
  )
} 