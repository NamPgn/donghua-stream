'use client'
import { Suspense, lazy, useState, useEffect, useRef, RefObject } from 'react'
import { FeaturedSlider } from "@/components/featured-slider"
import { Wrapper } from "@/components/wrapper"
import { WeeklySchedulePreview } from '@/components/weekly-schedule';

interface LazySectionProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
  className?: string;
}

interface SectionSkeletonProps {
  height?: string;
}

interface UseIntersectionObserverReturn {
  ref: RefObject<HTMLDivElement | null>;
  isVisible: boolean;
}

const NewReleases = lazy(() => import("./_components/NewReleases").then(module => ({
  default: module.NewReleases
})))

const PopularAnime = lazy(() => import("./_components/PopularAnime").then(module => ({
  default: module.PopularAnime
})))

const Categories = lazy(() => import("./_components/Categories").then(module => ({
  default: module.Categories
})))

const useIntersectionObserver = (threshold = 0.1): UseIntersectionObserverReturn => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

const LazySection = ({ children, fallback, className = "" }: LazySectionProps) => {
  const { ref, isVisible } = useIntersectionObserver(0.1)

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  )
}

// Loading skeleton
const SectionSkeleton = ({ height = "h-64" }: SectionSkeletonProps) => (
  <div className={`${height}`}>
  </div>
)

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Wrapper>
        {/* <div className="border-b bg-muted/30">
        <div className="container py-3 flex justify-center">
          <AdBanner position="header" size="banner" priority="high" />
        </div>
      </div> */}
        <section className="mb-12">
          <FeaturedSlider />
        </section>

        <LazySection
          fallback={<SectionSkeleton />}
          className="mb-8"
        >
          <NewReleases />
        </LazySection>

        <LazySection
          fallback={<SectionSkeleton />}
          className="mb-8"
        >
          <PopularAnime />
        </LazySection>

        {/* Weekly Schedule Preview */}
        <LazySection
          fallback={<SectionSkeleton />}
          className="mb-8"
        >
          <WeeklySchedulePreview />
        </LazySection>

        <LazySection
          fallback={<SectionSkeleton />}
          className="mb-8"
        >
          <Categories />
        </LazySection>

        {/* <div className="border-t bg-muted/30">
          <div className="container py-3 flex justify-center fixed bottom-0">
            <BottomBanner />
          </div>
        </div> */}
      </Wrapper>
    </div>
  )
}