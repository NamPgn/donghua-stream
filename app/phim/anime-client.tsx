"use client"

import { ArrowLeft, Star, Calendar, Clock, Film, Globe, BarChart4, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wrapper } from "@/components/wrapper"
import MVImage from "@/components/ui/image"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import MVLink from "@/components/Link"
import { ANIME_PATHS } from "@/constant/path.constant"
import { SOCIAL_LINKS } from "@/constant/social.constant"
import { useWatchlistStore } from "@/store/watchlist"

interface AnimeProduct {
	_id: string
	seri: string
	isApproved: boolean
	slug: string
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
	tags?: [{
		name: string;
		slug: string
	}]
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
	zaloGroupLink?: string
}

interface AnimeClientProps {
	anime: Anime
}

export function AnimeClient({ anime }: AnimeClientProps) {
	const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
	const { addAnime, removeAnime, isInWatchlist } = useWatchlistStore()
	const isInList = isInWatchlist(anime._id)

	const handleWatchlistClick = () => {
		if (isInList) {
			removeAnime(anime._id)
		} else {
			addAnime({
				_id: anime._id,
				name: anime.name,
				linkImg: anime.linkImg,
				slug: anime.slug,
				anotherName: anime.anotherName
			})
		}
	}
	return (
		<>
			{/* Header with background image - Full width */}
			<div className="relative h-[500px] md:h-[400px] w-full overflow-hidden">
				<div className="absolute inset-0">
					<MVImage
						src={anime.linkImg}
						alt={anime.name}
						fill
						className="object-cover brightness-[0.4] w-full h-full"
						priority
					/>
				</div>
				<div className="absolute inset-0 bg-gradient-to-t from-background md:via-background/50 via-background/0 to-transparent h-[500px] md:h-[400px]" />
				<div className="container relative h-[520px] md:h-[400px] flex flex-col justify-end pb-8 mx-auto">
					<MVLink href="/" className="absolute top-4 left-3 md:left-0 md:top-8">
						<Button variant="outline" size="sm" className="gap-1 bg-background/80 backdrop-blur-sm cursor-pointer">
							<ArrowLeft className="h-4 w-4" />
							<span className="hidden sm:inline">Trở về Trang chủ</span>
							<span className="sm:hidden">Trở về</span>
						</Button>
					</MVLink>
					<div className="flex flex-col md:flex-row gap-6 items-start mt-auto md:mt-0">
						<div className="relative h-[200px] w-[140px] md:h-[240px] md:w-[160px] rounded-lg overflow-hidden shadow-lg mx-auto md:mx-0">
							<MVImage
								src={anime.linkImg || "/placeholder.svg"}
								alt={anime.name}
								fill
								className="object-cover"
								priority
							/>
						</div>
						<div className="flex-1 text-center md:text-left">
							<div className="flex flex-wrap gap-2 mb-2 justify-center md:justify-start">
								{anime.tags?.map((tag, index) => (
									<Badge key={index} variant="secondary">{tag.name}</Badge>
								))}
							</div>
							<h1 className="text-2xl md:text-4xl font-bold mb-2 text-white line-clamp-2">{anime.name}</h1>
							<p className="text-sm md:text-base text-white/80 mb-4 line-clamp-2">{anime.anotherName}</p>
							<div className="flex flex-wrap gap-4 text-sm mb-4 justify-center md:justify-start">
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
								{
									anime.isMovie === 'drama' && (
										<div className="flex items-center gap-1 text-white/90">
											<Film className="h-4 w-4" />
											<span>{anime.sumSeri} tập</span>
										</div>
									)
								}
								<div className="flex items-center gap-1 text-white/90">
									<Globe className="h-4 w-4" />
									<span>{anime.lang}</span>
								</div>
								<div className="flex items-center gap-1 text-white/90">
									<BarChart4 className="h-4 w-4" />
									<span>{anime.quality}</span>
								</div>
							</div>
							{/* 3 buttons in one row on all screen sizes */}
							<div className="flex flex-row gap-2 md:gap-3 md:justify-start justify-center w-full px-2 md:px-0">
								<Button asChild className="flex-1 md:flex-none text-xs md:text-sm px-2 md:px-4">
									{
										anime?.isMovie === 'drama' ?
											<MVLink href={`${ANIME_PATHS.WATCH}/${anime?.products[0]?.slug}`}>
												<span className="hidden sm:inline">Xem ngay</span>
												<span className="sm:hidden">Xem</span>
											</MVLink> :
											<MVLink href={`${ANIME_PATHS.WATCH}/${anime.slug}`}>
												<span className="hidden sm:inline">Xem ngay</span>
												<span className="sm:hidden">Xem</span>
											</MVLink>
									}
								</Button>
								<Button variant="outline" onClick={handleWatchlistClick} className="flex-1 md:flex-none text-xs md:text-sm px-2 md:px-4">
									<span className="hidden sm:inline">{isInList ? 'Xóa khỏi danh sách' : 'Thêm vào danh sách'}</span>
									<span className="sm:hidden">{isInList ? 'Xóa' : 'Thêm'}</span>
								</Button>
								<Button variant="outline" asChild className="cursor-pointer flex-1 md:flex-none text-xs md:text-sm px-2 md:px-4">
									<a href={SOCIAL_LINKS.ZALO} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 md:gap-2">
										<MVImage src="/7044033_zalo_icon.svg" width={80} height={80} alt="Zalo" className="w-4 h-4 md:w-5 md:h-5" />
										<span className="hidden sm:inline whitespace-nowrap">Tham gia nhóm Zalo</span>
										<span className="sm:hidden">Zalo</span>
									</a>
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
						<Collapsible open={isDescriptionOpen} onOpenChange={setIsDescriptionOpen}>
							<CollapsibleTrigger className="flex items-center justify-between w-full mb-3 transition-colors">
								<h2 className="text-xl font-semibold">Nội dung</h2>
								{isDescriptionOpen ? (
									<ChevronUp className="h-5 w-5" />
								) : (
									<ChevronDown className="h-5 w-5" />
								)}
							</CollapsibleTrigger>
							<CollapsibleContent className="space-y-2">
								<p className="text-muted-foreground leading-relaxed">
									{anime.des}
								</p>
							</CollapsibleContent>
						</Collapsible>
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
									<p className="text-muted-foreground">{anime.time}</p>
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
							<div className="grid gap-3 max-h-[500px] overflow-y-auto pr-2">
								{anime.products && anime.products.length > 0
									? anime.products.map((product, index) => (
										<div
											key={index}
											className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
										>
											<div className="flex items-center gap-3">
												<div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-medium">
													{anime.isMovie === "drama" ? product.seri : 'Full'}
												</div>
												<div>
													{
														anime.isMovie !== 'drama' ? <h3 className="font-medium">Full</h3> : <h3 className="font-medium">Tập {product.seri}</h3>
													}
													<p className="text-sm text-muted-foreground">
														Đã phát hành
													</p>
												</div>
											</div>
											<Button size="sm" asChild disabled={!product.isApproved}>
												{
													anime.isMovie === 'drama' ? <MVLink href={`${ANIME_PATHS.WATCH}/${product.slug}`}>Xem</MVLink> : <MVLink href={`${ANIME_PATHS.WATCH}/${anime.slug}`}>Xem</MVLink>
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