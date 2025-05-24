"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Star, Calendar, Clock, Film, Globe, BarChart4 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wrapper } from "@/components/wrapper"

interface AnimeProduct {
	_id: string
	seri: string
	isApproved: boolean
}

interface Rating {
	user: string
	score: number
	date: string
}

interface Comment {
	user: string
	content: string
	rating: number
	date: string
}

interface Anime {
	_id: string
	name: string
	anotherName: string
	slug: string
	linkImg: string
	des: string
	sumSeri: string
	products: AnimeProduct[]
	type: string
	week: {
		name: string
	}
	up: number
	year: string
	time: string
	isActive: number
	rating: Rating[]
	ratingCount: number
	hour: string
	season: string
	lang: string
	quality: string
	comment: Comment[]
	upcomingReleases: string
	isMovie: string
	searchCount: number
	createdAt: string
	updatedAt: string
	latestProductUploadDate: string
	relatedSeasons: string
}

interface AnimeClientProps {
	anime: Anime
}

export function AnimeClient({ anime }: AnimeClientProps) {
	return (
		<>
			{/* Header with background image - Full width */}
			<div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
				<div className="absolute inset-0">
					<Image
						src={anime.linkImg}
						alt={anime.name}
						fill
						className="object-cover brightness-[0.4]"
						priority
					/>
				</div>
				<div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent h-[300px] md:h-[400px]" />
				<div className="container relative h-[300px] md:h-[400px] flex flex-col justify-end pb-8 mx-auto">
					<Link href="/" className="absolute top-4 md:top-8 ">
						<Button variant="outline" size="sm" className="gap-1 bg-background/80 backdrop-blur-sm cursor-pointer">
							<ArrowLeft className="h-4 w-4" />
							Trở về Trang chủ
						</Button>
					</Link>
					<div className="flex flex-col md:flex-row gap-6 items-start">
						<div className="relative h-[180px] w-[120px] md:h-[240px] md:w-[160px] rounded-lg overflow-hidden shadow-lg">
							<Image
								src={anime.linkImg || "/placeholder.svg"}
								alt={anime.name}
								fill
								className="object-cover"
								priority
							/>
						</div>
						<div className="flex-1">
							<div className="flex flex-wrap gap-2 mb-2">
								<Badge variant="secondary">{anime.type}</Badge>
								<Badge variant="secondary">{anime.isMovie}</Badge>
							</div>
							<h1 className="text-2xl md:text-4xl font-bold mb-2 text-white">{anime.name}</h1>
							<p className="text-sm md:text-base text-white/80 mb-4">{anime.anotherName}</p>
							<div className="flex flex-wrap gap-4 text-sm mb-4">
								<div className="flex items-center gap-1 text-white/90">
									<Star className="h-4 w-4 text-yellow-500" />
									<span>{anime.up} lượt thích</span>
								</div>
								<div className="flex items-center gap-1 text-white/90">
									<Calendar className="h-4 w-4" />
									<span>{anime.year}</span>
								</div>
								<div className="flex items-center gap-1 text-white/90">
									<Clock className="h-4 w-4" />
									<span>{anime.time}/tập</span>
								</div>
								<div className="flex items-center gap-1 text-white/90">
									<Film className="h-4 w-4" />
									<span>{anime.sumSeri} tập</span>
								</div>
								<div className="flex items-center gap-1 text-white/90">
									<Globe className="h-4 w-4" />
									<span>{anime.lang}</span>
								</div>
								<div className="flex items-center gap-1 text-white/90">
									<BarChart4 className="h-4 w-4" />
									<span>{anime.quality}</span>
								</div>
							</div>
							<div className="flex gap-3">
								<Button asChild>
									{
										anime?.isMovie === 'drama' ?
											<Link href={`/xem-phim/${anime.slug}-episode-${anime.products[0].seri}`}>Xem ngay</Link> :
											<Link href={`/xem-phim/${anime.slug}`}>Xem ngay</Link>
									}

								</Button>
								<Button variant="outline" className="text-white border-white/30 bg-white/10 hover:bg-white/20">
									Thêm vào danh sách
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Wrapper>
				<Tabs defaultValue="info" className="w-full">
					<TabsList className="mb-6">
						<TabsTrigger value="info">Thông tin</TabsTrigger>
						<TabsTrigger value="episodes">Danh sách tập</TabsTrigger>
						<TabsTrigger value="comments">Bình luận</TabsTrigger>
					</TabsList>
					<TabsContent value="info" className="space-y-6">
						<div>
							<h2 className="text-xl font-semibold mb-3">Nội dung</h2>
							<p className="text-muted-foreground">{anime.des}</p>
						</div>
						<Separator />
						<div>
							<h2 className="text-xl font-semibold mb-3">Thông tin chi tiết</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h3 className="font-medium">Thể loại</h3>
									<p className="text-muted-foreground">{anime.type}</p>
								</div>
								<div>
									<h3 className="font-medium">Năm phát hành</h3>
									<p className="text-muted-foreground">{anime.year}</p>
								</div>
								<div>
									<h3 className="font-medium">Lịch chiếu</h3>
									<p className="text-muted-foreground">
										{anime.week?.name} hàng tuần, {anime.hour}
									</p>
								</div>
								<div>
									<h3 className="font-medium">Thời lượng</h3>
									<p className="text-muted-foreground">{anime.time}/tập</p>
								</div>
								<div>
									<h3 className="font-medium">Ngôn ngữ</h3>
									<p className="text-muted-foreground">{anime.lang}</p>
								</div>
								<div>
									<h3 className="font-medium">Chất lượng</h3>
									<p className="text-muted-foreground">{anime.quality}</p>
								</div>
							</div>
						</div>
					</TabsContent>
					<TabsContent value="episodes">
						<div className="space-y-4">
							<h2 className="text-xl font-semibold mb-3">Danh sách tập</h2>
							<div className="grid gap-3">
								{anime.products && anime.products.length > 0
									? anime.products.map((product, index) => (
										<div
											key={index}
											className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
										>
											<div className="flex items-center gap-3">
												<div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-medium">
													{product.seri}
												</div>
												<div>
													{
														anime.isMovie !== 'drama' ? <h3 className="font-medium">Full</h3> : <h3 className="font-medium">Tập {product.seri}</h3>
													}
													<p className="text-sm text-muted-foreground">
														{product.isApproved ? "Đã phát hành" : "Sắp chiếu"}
													</p>
												</div>
											</div>
											<Button size="sm" asChild disabled={!product.isApproved}>
												{
													anime.isMovie === 'drama' ? <Link href={`/xem-phim/${anime.slug}-episode-${product.seri}`}>Xem</Link> : <Link href={`/xem-phim/${anime.slug}`}>Xem</Link>
												}
											</Button>
										</div>
									))
									: null}
							</div>
						</div>
					</TabsContent>
					<TabsContent value="comments">
						<div className="space-y-4">
							<h2 className="text-xl font-semibold mb-3">Bình luận</h2>

							{/* Comment Form */}
							<div className="p-4 rounded-lg border mb-6">
								<h3 className="font-medium mb-2">Thêm bình luận</h3>
								<textarea
									className="w-full p-2 border rounded-md mb-2 min-h-[100px]"
									placeholder="Viết bình luận của bạn..."
								/>
								<div className="flex justify-end">
									<Button>Đăng bình luận</Button>
								</div>
							</div>

							<div className="space-y-6">
								{anime.comment && anime.comment.length > 0 ? (
									anime.comment.map((comment, i) => (
										<div key={i} className="p-4 rounded-lg border">
											<div className="flex justify-between mb-2">
												<div className="font-medium">{comment.user}</div>
												<div className="flex items-center gap-1 text-sm">
													<Star className="h-3 w-3 text-yellow-500" />
													<span>{comment.rating}/10</span>
												</div>
											</div>
											<p className="text-muted-foreground mb-2">{comment.content}</p>
											<div className="text-xs text-muted-foreground">{comment.date}</div>
										</div>
									))
								) : (
									<div className="text-center text-muted-foreground py-8">
										Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
									</div>
								)}
							</div>
						</div>
					</TabsContent>
				</Tabs>

			</Wrapper>
		</>
	)
} 