import { AnimationCard } from "@/components/animation-card"
import { SearchResultsProps } from "../types/types"
import type { Anime } from "@/services/api/anime.api"

export function SearchResults({ results }: SearchResultsProps) {
  if (!Array.isArray(results) || results.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <h3 className="text-lg font-medium mb-2">Không tìm thấy anime nào</h3>
        <p className="text-muted-foreground">
          Vui lòng thử từ khóa khác hoặc xóa bộ lọc
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Kết quả tìm kiếm{" "}
        <span className="text-muted-foreground font-normal">
          ({results.length})
        </span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {results.map((anime: Anime) => (
          <AnimationCard key={anime._id} anime={anime} />
        ))}
      </div>
    </div>
  )
} 