import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { animeData } from "@/lib/data"
import MVLink from "@/components/Link"

export default function NewReleasesPage() {
  // Sort animes by release date (newest first)
  const newReleases = [...animeData].sort(
    (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
  )

  return (
    <div className="min-h-screen bg-background">


      <main className="container py-8 mx-auto px-2 md:px-0">
        <div className="flex items-center gap-2 mb-6">
          <MVLink href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              返回 Back
            </Button>
          </MVLink>
          <h1 className="text-3xl font-bold">最新更新 New Releases</h1>
        </div>

        <div className="mb-6">
          <p className="text-muted-foreground">最新上线和更新的动漫作品，按发布日期排序</p>
        </div>

        {/* Group animes by month */}
        {(() => {
          const groupedByMonth: Record<string, typeof animeData> = {}

          newReleases.forEach((anime) => {
            const date = new Date(anime.releaseDate)
            const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

            if (!groupedByMonth[monthYear]) {
              groupedByMonth[monthYear] = []
            }

            groupedByMonth[monthYear].push(anime)
          })

          return Object.entries(groupedByMonth).map(([monthYear]) => {
            const [year, month] = monthYear.split("-")
            const monthNames = [
              "一月",
              "二月",
              "三月",
              "四月",
              "五月",
              "六月",
              "七月",
              "八月",
              "九月",
              "十月",
              "十一月",
              "十二月",
            ]
            const monthName = monthNames[Number.parseInt(month) - 1]

            return (
              <section key={monthYear} className="mb-12">
                <h2 className="text-2xl font-bold mb-6">
                  {year}年{monthName} {monthName} {year}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                </div>
              </section>
            )
          })
        })()}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container py-8 mx-auto px-2 md:px-0">
          <div className="text-center text-sm text-muted-foreground">
            &copy; 2025 动漫天地 AnimeWorld. 保留所有权利。
          </div>
        </div>
      </footer>
    </div>
  )
}
