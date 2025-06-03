import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { SearchFiltersProps } from "../types/types"

export function SearchFilters({
  selectedCategories,
  onCategoryChange,
  statusFilter,
  onStatusChange,
  categories,
  onClearFilters,
}: SearchFiltersProps) {
  const handleCategoryChange = (categoryId: string) => {
    onCategoryChange(categoryId)
  }

  const handleStatusChange = (status: string) => {
    onStatusChange(status)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <h2 className="font-medium mb-4">Thể loại</h2>
        <div className="space-y-2">
          {categories?.map((category) => (
            <div key={category._id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.slug}`}
                checked={selectedCategories.includes(category.slug)}
                onCheckedChange={() => handleCategoryChange(category.slug)}
              />
              <label
                htmlFor={`category-${category.slug}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name}
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
              checked={statusFilter === "0"}
              onCheckedChange={() => handleStatusChange(statusFilter === "0" ? "" : "1")}
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
              checked={statusFilter === "1"}
              onCheckedChange={() => handleStatusChange(statusFilter === "1" ? "" : "0")}
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

      <Button variant="outline" className="w-full" onClick={onClearFilters}>
        Xóa bộ lọc
      </Button>
    </div>
  )
} 