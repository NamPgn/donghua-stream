"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Clock, Play, Calendar, CalendarDays } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSchedule } from "@/hooks/useSchedule"
import type { AnimeContent, Tag } from "@/services/api/schedule.api"
import MVLink from "./Link"
import { ANIME_PATHS } from "@/constant/path.constant"

const DAYS = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"]

export function WeeklySchedulePreview() {
	const [selectedDay, setSelectedDay] = useState("Thứ 2")
	const { schedule, isLoading } = useSchedule(selectedDay)
	const currentDay = new Date().toLocaleDateString("vi-VN", { weekday: "long" })
	const getTodayKey = () => {
		const dayMap: Record<string, string> = {
			"Thứ Hai": "Thứ 2",
			"Thứ Ba": "Thứ 3",
			"Thứ Tư": "Thứ 4",
			"Thứ Năm": "Thứ 5",
			"Thứ Sáu": "Thứ 6",
			"Thứ Bảy": "Thứ 7",
			"Chủ Nhật": "Chủ nhật",
		}
		return dayMap[currentDay] || "Thứ 2"
	}

	useEffect(() => {
		setSelectedDay(getTodayKey())
	}, [])

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
			</div>
		)
	}

	return (
		<div className="w-full mx-auto space-y-3 sm:space-y-4">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-2">
					<CalendarDays className="h-6 w-6 text-primary text-blue-500" />
					<h2 className="text-2xl font-bold">Lịch chiếu tuần này</h2>
				</div>
				{/* <Link href="/schedule" className="flex items-center text-sm text-primary hover:underline">
					Xem chi tiết <ArrowRight className="ml-1 h-4 w-4" />
				</Link> */}
			</div>
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
				<div className="flex items-center sm:gap-1">
					<span className="text-xs sm:text-sm text-muted-foreground">Hôm nay, </span>
					<div className="text-xs sm:text-sm text-muted-foreground">
						{new Date().toLocaleDateString("vi-VN", {
							weekday: "long",
							day: "2-digit",
							month: "2-digit",
						})}
					</div>
				</div>
				{/* <div className="text-xs sm:text-sm text-muted-foreground">
					<span className="font-medium">{schedule?.content?.length || 0}</span> phim
				</div> */}
			</div>

			{/* Tabs */}
			<Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
				<TabsList className="grid w-full grid-cols-7">
					{DAYS.map((day) => (
						<TabsTrigger key={day} value={day} className="text-xs">
							{day}
							{day === getTodayKey() && <div className="w-1 h-1 bg-primary rounded-full ml-1" />}
						</TabsTrigger>
					))}
				</TabsList>

				{DAYS.map((day) => (
					<TabsContent key={day} value={day} className="mt-3 sm:mt-4">
						{!schedule?.content?.length ? (
							<div className="text-center py-8 sm:py-12 text-muted-foreground">
								<Calendar className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 opacity-50" />
								<p className="text-sm sm:text-base">Không có phim nào trong ngày này</p>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
								{schedule.content.map((anime: AnimeContent) => (
									<Card
										key={anime._id}
										className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-card/50 hover:bg-card"
									>
										<MVLink href={ANIME_PATHS.BASE + "/" + anime.slug}>
											<div className="flex gap-2 sm:gap-3 p-2 sm:p-3">
												{/* Thumbnail */}
												<div className="relative w-12 sm:w-14 aspect-[3/4] flex-shrink-0 rounded-md overflow-hidden bg-muted">
													<Image
														src={anime.linkImg}
														alt={anime.name}
														fill
														className="object-cover transition-transform duration-200 group-hover:scale-105"
													/>
												</div>

												{/* Content */}
												<div className="flex-1 min-w-0 flex flex-col justify-between">
													{/* Title & Type */}
													<div className="space-y-0.5 sm:space-y-1">
														<h4 className="font-medium text-xs sm:text-sm line-clamp-2 leading-tight">{anime.name}</h4>
														<p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">{anime.tags.length > 0 ? anime.tags?.map((tag: Tag) => tag.name).join(', ') : '3D, Tiên Hiệp'}</p>
													</div>

													{/* Episode & Time */}
													<div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-2">
														<div className="flex items-center gap-1">
															<Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary flex-shrink-0" />
															<span className="text-[10px] sm:text-xs font-medium">
																Tập {anime.products[0]?.seri || 1}
															</span>
														</div>
														<div className="flex items-center gap-1">
															<Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground flex-shrink-0" />
															<span className="text-[10px] sm:text-xs text-muted-foreground">{anime.time}</span>
														</div>
													</div>

													{/* Categories */}
													<div className="flex flex-wrap gap-1 mt-1 sm:mt-2">
														{anime.tags
															.map((category: Tag) => (
																<Badge
																	key={category._id}
																	variant="secondary"
																	className="text-[9px] sm:text-[10px] px-1.5 py-0 h-4 sm:h-5 bg-muted/50 hover:bg-muted/80 transition-colors"
																>
																	{category.name}
																</Badge>
															))}
														{anime.tags.length > 2 && (
															<Badge
																variant="outline"
																className="text-[9px] sm:text-[10px] px-1.5 py-0 h-4 sm:h-5 opacity-60"
															>
																+{anime.tags.length - 2}
															</Badge>
														)}
													</div>
												</div>
											</div>
										</MVLink>

									</Card>
								))}
							</div>
						)}
					</TabsContent>
				))}
			</Tabs>
		</div>
	)
}
