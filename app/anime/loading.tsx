"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function AnimeLoading() {    
  return (
    <>
      {/* Header with background skeleton */}
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden bg-muted">
        <div className="container relative h-[300px] md:h-[400px] flex flex-col justify-end pb-8 mx-auto">
          <div className="absolute top-4 md:top-8">
            <Skeleton className="h-9 w-[140px]" />
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Skeleton className="h-[180px] w-[120px] md:h-[240px] md:w-[160px] rounded-lg" />
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-10 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2 mb-4" />
              <div className="flex flex-wrap gap-4 mb-4">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-5 w-24" />
                ))}
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container py-8 mx-auto">
        <div className="space-y-6">
          {/* Tabs skeleton */}
          <div className="flex gap-2 mb-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-24" />
            ))}
          </div>

          {/* Content skeleton */}
          <div className="space-y-6">
            <div>
              <Skeleton className="h-7 w-32 mb-3" />
              <Skeleton className="h-20 w-full" />
            </div>
            <div className="h-px bg-border" />
            <div>
              <Skeleton className="h-7 w-40 mb-3" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-5 w-24 mb-2" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
} 