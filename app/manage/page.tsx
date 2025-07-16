import Link from "next/link"
import { ArrowLeft, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FavoritesList } from "@/components/favorites-list"
import { Wrapper } from "@/components/wrapper"

export default function ManagePage() {
  return (
    <Wrapper>

      <main className="container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Quản lý danh sách</h1>
        </div>

        <Tabs defaultValue="favorites" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="favorites" className="gap-1">
              <Heart className="h-4 w-4" />
              Phim đã lưu
            </TabsTrigger>
          </TabsList>

          <TabsContent value="favorites">
            <FavoritesList />
          </TabsContent>
        </Tabs>
      </main>

    </Wrapper>
  )
}
