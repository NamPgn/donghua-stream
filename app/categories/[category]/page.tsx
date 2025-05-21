import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { animeData } from "@/lib/data"
type tParams = Promise<{ category: string }>;
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

export function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    category,
  }))
}


export default async function CategoryPage({ params }: { params: tParams }) {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)

  // Check if category exists
  const allCategories = getAllCategories()
  if (!allCategories.includes(decodedCategory)) {
    notFound()
  }

  const categoryAnimes = animeData.filter((anime) => anime.categories.includes(decodedCategory))

  return (
    <div className="min-h-screen bg-background">
  

      <main className="container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/categories">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              返回分类 Back to Categories
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{decodedCategory} 动漫</h1>
        </div>

        <div className="mb-6">
          <p className="text-muted-foreground">
            共找到 {categoryAnimes.length} 部 {decodedCategory} 类动漫作品
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {/* <AnimationCard  /> */}
        </div>
      </main>
    </div>
  )
}
