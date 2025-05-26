import { FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"
import MVLink from "@/components/Link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <div className="rounded-full bg-muted p-6 text-primary mb-6">
        <FileQuestion className="h-12 w-12" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Không tìm thấy trang</h2>
      <p className="text-muted-foreground mb-6 max-w-md">Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <MVLink href="/">Trở về trang chủ</MVLink>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <MVLink href="/categories">Khám phá thể loại</MVLink>
        </Button>
      </div>
    </div>
  )
}
