"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { useSlider } from "@/hooks/useSlider"
import type { Poster } from "@/services/api/poster.api"
import Link from "next/link"

export function FeaturedSlider() {
  const { data, isLoading, error } = useSlider()

  if (isLoading) {
    return (
      <div className="aspect-[16/9] sm:aspect-[21/9] md:aspect-[21/7] w-full bg-muted animate-pulse rounded-xl" />
    )
  }

  if (error || !data?.data) {
    return null
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        autoplay={{ delay: 5000 }}
        navigation={{
          nextEl: ".custom-swiper-button-next",
          prevEl: ".custom-swiper-button-prev"
        }}
        pagination={{ clickable: true }}
        effect="fade"
        loop
        className="rounded-xl overflow-hidden"
      >
        {data.data.map((poster: Poster) => (
          <SwiperSlide key={poster._id}>
            <div className="aspect-[16/9] sm:aspect-[21/9] md:aspect-[21/7] w-full overflow-hidden ">
              <Image
                src={poster.poster}
                alt={poster.name}
                width={1600}
                height={800}
                className="object-cover h-full"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center p-4 sm:p-8 md:p-20">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap gap-2 mb-2 sm:mb-3">
                    <Badge variant="secondary" className="text-xs sm:text-sm">{poster.type}</Badge>
                    <Badge variant="secondary" className="text-xs sm:text-sm">{poster.quality}</Badge>
                  </div>
                  <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
                    {poster.name}
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base text-white/80 mb-3 sm:mb-4 line-clamp-2 md:line-clamp-3">
                    {poster.descriptions}
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <Link href={`${poster.link}`}>
                      <Button size="sm" className="gap-2 text-xs sm:text-sm">
                        <Play className="h-3 w-3 sm:h-4 sm:w-4" />
                        Xem ngay
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs sm:text-sm text-white border-white/30 bg-white/10 hover:bg-white/20"
                    >
                      Tìm hiểu thêm
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="hidden md:block">
        <Button
          variant="outline"
          size="icon"
          className=" custom-swiper-button-prev bg-background/80 absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 backdrop-blur-sm transition-all duration-300 hover:scale-110 h-8 w-8 sm:h-10 sm:w-10"
        >
          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className=" custom-swiper-button-next bg-background/80 absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 backdrop-blur-sm transition-all duration-300 hover:scale-110 h-8 w-8 sm:h-10 sm:w-10"
        >
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </div>
    </div>
  )
}