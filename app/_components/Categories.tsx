'use client'
import { ArrowRight, Tags } from "lucide-react"
import { useSeriesContext } from "@/contexts/SeriesContext"
import MVLink from "@/components/Link";

interface seriesProp {
  _id: string;
  slug: string;
  name: string
}

export function Categories() {
  const { data: series } = useSeriesContext();

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Tags className="w-6 h-6 text-green-600" />
          Thể Loại
        </h2>
        <MVLink href="/categories" className="flex items-center text-sm text-primary hover:underline">
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </MVLink>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {series && series.map((category: seriesProp) => (
          <MVLink
            key={category._id}
            href={`/categories/${category.slug}`}
            className="bg-muted hover:bg-muted/80 transition-colors rounded-lg p-4 text-center"
          >
            <div className="font-medium">{category.name}</div>
          </MVLink>
        ))}
      </div>
    </section>
  )
} 