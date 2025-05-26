import { ArrowLeft, Settings, Heart, Clock, Calendar, Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { animeData } from "@/lib/data"
import MVImage from "@/components/ui/image"
import MVLink from "@/components/Link"

export default function ProfilePage() {
  // Mock user data
  const user = {
    name: "动漫迷",
    username: "animefan123",
    avatar: "/placeholder.svg?height=200&width=200",
    joinDate: "2023-05-15",
    bio: "热爱中国动漫的忠实粉丝，最喜欢武侠和仙侠类动漫。",
  }

  // Mock user's favorite animes
  const favoriteAnimes = animeData.slice(0, 8)

  // Mock user's watch history
  const watchHistory = animeData.slice(8, 16)

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
          <h1 className="text-3xl font-bold">个人资料 Profile</h1>
        </div>

        {/* User Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
          <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-background shadow-lg">
            <MVImage src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">@{user.username}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Edit className="h-4 w-4" />
                  编辑资料 Edit Profile
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Settings className="h-4 w-4" />
                  设置 Settings
                </Button>
              </div>
            </div>
            <p className="mt-4">{user.bio}</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>加入于 Joined {user.joinDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{favoriteAnimes.length} 部收藏</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Content Tabs */}
        <Tabs defaultValue="favorites" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="favorites" className="gap-1">
              <Heart className="h-4 w-4" />
              收藏 Favorites
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-1">
              <Clock className="h-4 w-4" />
              观看历史 History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="favorites">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">我的收藏 My Favorites</h2>
                <Button variant="outline" size="sm">
                  管理收藏 Manage
                </Button>
              </div>

              {favoriteAnimes.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {/* <AnimationCard /> */}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <h3 className="text-lg font-medium mb-2">还没有收藏动漫</h3>
                  <p className="text-muted-foreground mb-4">浏览动漫并点击收藏按钮将它们添加到这里</p>
                  <Button asChild>
                    <MVLink href="/">浏览动漫 Browse Anime</MVLink>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">观看历史 Watch History</h2>
                <Button variant="outline" size="sm">
                  清除历史 Clear
                </Button>
              </div>

              {watchHistory.length > 0 ? (
                <div className="space-y-4">
                  {watchHistory.map((anime) => (
                    <div
                      key={anime.id}
                      className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="relative h-16 w-12 overflow-hidden rounded">
                        <MVImage
                          src={anime.image || "/placeholder.svg"}
                          alt={anime.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{anime.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{anime.chineseTitle}</p>
                        <div className="text-xs text-muted-foreground mt-1">上次观看: 第 3 集 (2025-03-15)</div>
                      </div>
                      <Button size="sm">继续观看 Continue</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <h3 className="text-lg font-medium mb-2">还没有观看历史</h3>
                  <p className="text-muted-foreground mb-4">开始观看动漫，您的历史记录将显示在这里</p>
                  <Button asChild>
                    <MVLink href="/">浏览动漫 Browse Anime</MVLink>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
