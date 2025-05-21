import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { animeData } from "@/lib/data"

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

export default function CategoriesPage() {
  const categories = getAllCategories()

  return (
    <div className="min-h-screen bg-background">


      <main className="container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              返回 Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">动漫分类 Categories</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/categories/${category}`}
              className="bg-muted hover:bg-muted/80 transition-colors rounded-lg p-6 text-center"
            >
              <div className="font-medium text-lg">{category}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {animeData.filter((anime) => anime.categories.includes(category)).length} 部作品
              </div>
            </Link>
          ))}
        </div>

        {/* Display animes by category */}
        {categories.map((category) => {
          return (
            <section key={category} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{category}</h2>
                <Link href={`/categories/${category}`} className="text-sm text-primary hover:underline">
                  查看全部 View All
                </Link>
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
