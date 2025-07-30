"use client"

import Link from "next/link"
import { ArrowLeft, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWatchlistStore } from "@/store/watchlist"
import { Wrapper } from "@/components/wrapper"
import { Card, CardContent } from "@/components/ui/card"
import MVLink from "@/components/Link"
import MVImage from "@/components/ui/image"
import { ANIME_PATHS } from "@/constant/path.constant"

export default function ProfilePage() {
  const { animes } = useWatchlistStore()
  // // Mock user data
  // const user = {
  //   name: "Người dùng",
  //   username: "donghuafan",
  //   avatar: "/images/SaveTik.co_7490584419300887849_433.jpeg",
  //   joinDate: "16/07/2025",
  //   bio: "Đang cập nhật",
  // }

  return (
    <Wrapper>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <main className="container">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Quay lại
              </Button>
            </Link>
            {/* <h1 className="text-3xl font-bold"></h1> */}
          </div>

          {/* User Profile Header */}
          {/* <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-background shadow-lg">
              <Image src={"/images/SaveTik.co_7490584419300887849_433.jpeg"} alt={user.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" disabled size="sm" className="gap-1 bg-transparent">
                    <Edit className="h-4 w-4" />
                    Chỉnh sửa hồ sơ
                  </Button>
                  <Button variant="outline" disabled size="sm" className="gap-1 bg-transparent">
                    <Settings className="h-4 w-4" />
                    Cài đặt
                  </Button>
                </div>
              </div>
              <p className="mt-4">{user.bio}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Tham gia ngày {user.joinDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>{animes.length} phim đã lưu</span>
                </div>
              </div>
            </div>
          </div> */}

          {/* User Content Tabs */}
          <Tabs defaultValue="favorites" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="favorites" className="gap-1">
                <Heart className="h-4 w-4" />
                Phim đã lưu ({animes.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="favorites">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Danh sách phim đã lưu</h2>
                  <Link href="/manage">
                    <Button variant="outline" size="sm">
                      Quản lý danh sách
                    </Button>
                  </Link>
                </div>

                {animes.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {animes.slice(0, 10).map((anime) => (
                      <Card key={anime._id} className="overflow-hidden h-full transition-all hover:shadow-md group">
                        <MVLink href={`${ANIME_PATHS.BASE}/${anime.slug}`} >
                          <div className="relative aspect-[3/4] overflow-hidden">
                            <MVImage
                              src={anime.linkImg}
                              alt={anime.name}
                              fill
                              sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw"
                              className="object-cover transition-transform group-hover:scale-105"
                              priority={false}
                              loading="lazy"
                            />
                          </div>
                        </MVLink>
                        <CardContent className="p-2 sm:p-2.5">
                          <MVLink href={`${ANIME_PATHS.BASE}/${anime.slug}`} className="hover:text-primary transition-colors">
                            <h3 className="font-medium text-xs sm:text-sm line-clamp-1 mb-0.5">{anime.name}</h3>
                            {anime.anotherName && (
                              <p className="text-[10px] sm:text-[11px] text-muted-foreground line-clamp-1 mb-1 sm:mb-1.5">
                                {anime.anotherName}
                              </p>
                            )}
                          </MVLink>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Chưa có phim nào được lưu</h3>
                    <p className="text-muted-foreground mb-4">Hãy duyệt phim và nhấn nút lưu để thêm vào danh sách của bạn</p>
                    <Button asChild>
                      <Link href="/">Khám phá phim</Link>
                    </Button>
                  </div>
                )}

                {animes.length > 10 && (
                  <div className="text-center">
                    <Link href="/manage">
                      <Button variant="outline">Xem tất cả {animes.length} phim đã lưu</Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </Wrapper>
  )
}
