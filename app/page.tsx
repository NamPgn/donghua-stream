'use client'
import { FeaturedSlider } from "@/components/featured-slider"
import { Wrapper } from "@/components/wrapper"
import { NewReleases } from "./_components/NewReleases"
import { PopularAnime } from "./_components/PopularAnime"
import { Categories } from "./_components/Categories"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Wrapper>
        {/* Hero Section */}
        <section className="mb-12">
          <FeaturedSlider />
        </section>

        {/* New Releases Section */}
        <NewReleases />

        {/* Popular Section */}
        <PopularAnime />

        {/* Categories Section */}
        <Categories />
      </Wrapper>
    </div>
  )
}
