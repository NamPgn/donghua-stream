'use client'

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSeriesContext } from "@/contexts/SeriesContext"
import MVLink from "@/components/Link"

interface Series {
  _id: string;
  name: string;
  slug: string;
}



export default function CategoriesPage() {
  const { data: series } = useSeriesContext();

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-8 mx-auto px-2 md:px-0">
        <div className="flex items-center gap-2 mb-6">
          <MVLink href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Trang Chủ
            </Button>
          </MVLink>
          <h1 className="text-3xl font-bold">Thể Loại</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
          {series?.map((category: Series) => (
            <MVLink
              key={category._id}
              href={`/categories/${category.slug}`}
              className="bg-muted hover:bg-muted/80 transition-colors rounded-lg p-6 text-center"
            >
              <div className="font-medium text-lg">{category.name}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {category.name}
              </div>
            </MVLink>
          ))}
        </div>

        {/* Display animes by category */}
        {series?.map((category: Series) => {
          return (
            <section key={category._id} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <MVLink href={`/categories/${category.slug}`} className="text-sm text-primary hover:underline">
                  Xem thêm
                </MVLink>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {/* <AnimationCard /> */}
              </div>
              <Separator className="mt-8" />
            </section>
          )
        })}
      </main>
    </div>
  )
}
