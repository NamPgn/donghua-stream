"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Wrapper } from "@/components/wrapper"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <Wrapper>
        {/* Back button skeleton */}
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-9 w-[140px]" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Video player and episode list container */}
          <div className="w-full lg:w-3/4">
            {/* Video player skeleton */}
            <div className="bg-background rounded-lg overflow-hidden shadow-sm">
              <Skeleton className="w-full aspect-video" />
            </div>

            {/* Mobile episode selector skeleton */}
            <div className="block md:hidden mt-4">
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Episode list skeleton */}
          <div className="hidden md:block w-full lg:w-1/4">
            <div className="bg-card rounded-lg shadow-sm p-4">
              <Skeleton className="h-7 w-32 mb-4" />
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-5 w-20 mb-1" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-9 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Anime info skeleton */}
        <div className="mt-6">
          <Skeleton className="h-8 w-64 mb-2" />
          <div className="flex flex-wrap gap-4 mt-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-32" />
            ))}
          </div>
        </div>

        {/* Anime details skeleton */}
        <div className="mt-6 space-y-6">
          <div className="p-4 rounded-lg border">
            <div className="flex flex-wrap gap-2 mb-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-20" />
              ))}
            </div>
            <Skeleton className="h-20 w-full mb-4" />
            <div className="flex flex-wrap gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-32" />
              ))}
            </div>
          </div>

          {/* Comments section skeleton */}
          <div>
            <Skeleton className="h-10 w-24 mb-6" />
            <div className="space-y-4">
              <div className="p-4 rounded-lg border">
                <Skeleton className="h-7 w-32 mb-2" />
                <Skeleton className="h-24 w-full mb-2" />
                <div className="flex justify-end">
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-4 rounded-lg border">
                  <div className="flex justify-between mb-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <Skeleton className="h-16 w-full mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}
