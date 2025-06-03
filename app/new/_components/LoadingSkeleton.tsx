import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface LoadingSkeletonProps {
  viewMode: "grid" | "list"
}

export function LoadingSkeleton({ viewMode }: LoadingSkeletonProps) {
  return (
    <div
      className={`grid gap-4 ${
        viewMode === "grid" ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" : "grid-cols-1"
      }`}
    >
      {Array.from({ length: 24 }).map((_, i) => (
        <Card key={i} className="overflow-hidden bg-gradient-to-br from-card to-muted/20 border-0 shadow-lg">
          {viewMode === "grid" ? (
            <>
              <div className="relative">
                <Skeleton className="aspect-[3/4] w-full" />
                <div className="absolute top-3 right-3">
                  <Skeleton className="h-5 w-12 rounded-full" />
                </div>
              </div>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-2/3 mb-3" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-8" />
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="p-0">
              <div className="flex gap-0">
                <Skeleton className="w-24 h-32 flex-shrink-0" />
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-5 w-12 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-1/2 mb-3" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-8 w-16 rounded" />
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
} 