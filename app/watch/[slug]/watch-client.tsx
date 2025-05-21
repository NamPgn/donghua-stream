"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight, Eye, Calendar, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoPlayer } from "@/components/video-player"

interface Product {
	_id: string
	seri: string
	isApproved: boolean
	view: number
}

interface Comment {
	user: string
	content: string
	rating: number
	date: string
}

interface Category {
	_id: string
	name: string
	slug: string
	des: string
	type: string
	isMovie: string
	year: string
	time: string
	lang: string
	quality: string
	products: Product[]
}

interface Anime {
	name: string
	slug: string
	seri: string
	isApproved: boolean
	view: number
	category: Category
	copyright: string
	comment: Comment[]
}

export function WatchClient({ anime }: { anime: Anime }) {
	const [comment, setComment] = useState("")

	const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setComment(e.target.value)
	}

	const handleSubmitComment = (e: React.FormEvent) => {
		e.preventDefault()
		setComment("")
	}

	const currentEpisode = anime.category.products[0]
	const currentEpisodeNumber = parseInt(currentEpisode?.seri || "1")
	const totalEpisodes = parseInt(anime.category.products.length.toString() || "0")

	const prevEpisode = currentEpisodeNumber > 1 ? currentEpisodeNumber - 1 : null
	const nextEpisode = currentEpisodeNumber < totalEpisodes ? currentEpisodeNumber + 1 : null
	return (
		<div className="min-h-screen bg-background">
			<main className="container py-6 mx-auto">
				<div className="flex items-center gap-2 mb-4">
					<Link href={`/anime/${anime.category.slug}`}>
						<Button variant="ghost" size="sm" className="gap-1 cursor-pointer">
							<ArrowLeft className="h-4 w-4" />
							Trở về Chi tiết
						</Button>
					</Link>
				</div>

				<div className="container mx-auto py-6 space-y-6 md:space-y-8">
					<div className="block md:hidden mb-4">
						<select
							className="w-full p-2 border rounded-md bg-background"
							onChange={(e) => {
								const episodeNumber = e.target.value;
								if (episodeNumber) {
									window.location.href = `/watch/${anime.category.slug}-episode-${episodeNumber}`;
								}
							}}
						>
							{anime.category.products.map((product: Product) => (
								<option
									key={product._id}
									value={product.seri}
									disabled={!product.isApproved}
								>
									{product.isApproved
										? `Tập ${product.seri} - Đã phát hành`
										: `Tập ${product.seri} - Sắp chiếu`
									}
								</option>
							))}
						</select>
					</div>

					<div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
						<div className="w-full lg:w-3/4">
							<div className="bg-background rounded-lg overflow-hidden shadow-sm">
								<VideoPlayer episode={currentEpisode} anime={anime} />
							</div>
						</div>

						<div className="hidden md:block w-full lg:w-1/4">
							<div className="bg-card rounded-lg shadow-sm p-4">
								<h2 className="text-lg font-semibold mb-4 border-b pb-2">Danh sách tập</h2>
								<div className="h-[500px] overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground/30 hover:scrollbar-thumb-muted-foreground/50">
									<div className="flex gap-2">
										{prevEpisode && (
											<Button variant="outline" size="sm" asChild>
												<Link href={`/watch/${anime.category.slug}-episode-${prevEpisode}`} className="flex items-center gap-1">
													<ChevronLeft className="h-4 w-4" />
													Tập trước
												</Link>
											</Button>
										)}
										{nextEpisode && (
											<Button variant="outline" size="sm" asChild>
												<Link href={`/watch/${anime.category.slug}-episode-${nextEpisode}`} className="flex items-center gap-1">
													Tập sau
													<ChevronRight className="h-4 w-4" />
												</Link>
											</Button>
										)}
									</div>
									<div className="space-y-4">
										<div className="grid gap-3">
											{anime.category.products.map((product: Product) => (
												<div
													key={product._id}
													className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
												>
													<div className="flex items-center gap-3">
														<div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-medium">
															{product.seri}
														</div>
														<div>
															{
																anime.category.isMovie !== 'drama' ? <h3 className="font-medium">Full</h3> : <h3 className="font-medium">Tập {product.seri}</h3>
															}
															<p className="text-sm text-muted-foreground">
																{product.isApproved ? "Đã phát hành" : "Sắp chiếu"}
															</p>
														</div>
													</div>
													{
														anime.category.isMovie !== 'drama' ? <Button size="sm" asChild disabled={!product.isApproved}>
															<Link href={`/watch/${anime.category.slug}`}>Xem</Link>
														</Button> : <Button size="sm" asChild disabled={!product.isApproved}>
															<Link href={`/watch/${anime.category.slug}-episode-${product.seri}`}>Xem</Link>
														</Button>
													}
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
					<div>
						<h1 className="text-2xl font-bold">{anime.name} - <div className="bg-primary/10">Tập {anime.seri}</div></h1>
						<div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
							<p>Tập {anime.seri}</p>
							<div className="flex items-center gap-1">
								<Eye className="h-4 w-4" />
								<span>{anime.view} lượt xem</span>
							</div>
							<div className="flex items-center gap-1">
								<Calendar className="h-4 w-4" />
								<span>Đăng tải: 1/1/2025</span>
							</div>
							<div className="flex items-center gap-1">
								<Clock className="h-4 w-4" />
								<span>{anime.category.time}</span>
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
					<div className="space-y-6">
						<div className="p-4 rounded-lg border">
							<div className="flex flex-wrap gap-2 mb-2">
								<Badge variant="secondary">{anime.category.type}</Badge>
								<Badge variant="secondary">{anime.category.isMovie}</Badge>
								<Badge variant="outline" className="text-yellow-600 bg-yellow-50">
									{anime.copyright}
								</Badge>
							</div>
							<p className="mb-4">{anime.category.des}</p>
							<div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
								<div>Năm: {anime.category.year}</div>
								<div>Thời lượng: {anime.category.time}</div>
								<div>Ngôn ngữ: {anime.category.lang}</div>
								<div>Chất lượng: {anime.category.quality}</div>
							</div>
						</div>

						<Tabs defaultValue="comments" className="w-full">
							<TabsList className="mb-6">
								<TabsTrigger value="comments">Bình luận</TabsTrigger>
							</TabsList>
							<TabsContent value="comments">
								<div className="space-y-4">
									<h2 className="text-xl font-semibold mb-3">Bình luận</h2>

									<form onSubmit={handleSubmitComment} className="p-4 rounded-lg border mb-6">
										<h3 className="font-medium mb-2">Thêm bình luận</h3>
										<textarea
											className="w-full p-2 border rounded-md mb-2 min-h-[100px]"
											placeholder="Viết bình luận của bạn..."
											value={comment}
											onChange={handleCommentChange}
										/>
										<div className="flex justify-end">
											<Button type="submit">Đăng bình luận</Button>
										</div>
									</form>

									<div className="space-y-6">
										{anime.comment && anime.comment.length > 0 ? (
											anime.comment.map((comment: Comment, i: number) => (
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
					</div>
				</div>
			</main>
		</div>
	)
}