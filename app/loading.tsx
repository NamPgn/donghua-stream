import { Skeleton } from "@/components/ui/skeleton"
import { Wrapper } from "@/components/wrapper"

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-background ">
     <Wrapper>
        {/* Hero Skeleton */}
        <section className="mb-12">
          <Skeleton className="w-full aspect-[21/9] md:aspect-[21/7] rounded-xl" />
        </section>

        {/* Popular Section Skeleton */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <AnimeCardSkeleton key={i} />
              ))}
          </div>
        </section>

        {/* New Releases Section Skeleton */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <AnimeCardSkeleton key={i} />
              ))}
          </div>
        </section>

        {/* Categories Section Skeleton */}
        <section className="mb-12">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-16 rounded-lg" />
              ))}
          </div>
        </section>
      </Wrapper>

      {/* Footer Skeleton */}
      <footer className="border-t bg-muted/50">
        <div className="container py-8 mx-auto px-2 md:px-0 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
          </div>
          <Skeleton className="h-4 w-64 mx-auto mt-8" />
        </div>
      </footer>
    </div>
  )
}

function AnimeCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
      <Skeleton className="aspect-[2/3] w-full" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex items-center justify-between mt-2">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
    </div>
  )
}
