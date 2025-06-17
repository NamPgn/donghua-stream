import { Moon, Sun } from "lucide-react"

export default function Greeting() {
	const hour = new Date().getHours()
	const isMorning = hour >= 5 && hour < 12
	const isAfternoon = hour >= 12 && hour < 18
	const isEvening = hour >= 18 || hour < 5

	return (
		<div className="flex items-center gap-3 text-white/90 mb-6">
			{isMorning && (
				<>
					<div className="relative">
						<Sun className="w-6 h-6 text-yellow-400 animate-spin" style={{animationDuration: '8s'}} />
						<div className="absolute -inset-1 bg-yellow-400/20 rounded-full animate-pulse"></div>
					</div>
					<span className="text-sm sm:text-base text-muted-foreground font-medium">
						Chào buổi sáng! Hãy bắt đầu ngày mới với những bộ phim hay
					</span>
				</>
			)}
			{isAfternoon && (
				<>
					<div className="relative">
						<Sun className="w-6 h-6 text-orange-400 animate-bounce" style={{animationDuration: '3s'}} />
						<div className="absolute -inset-1 bg-orange-400/20 rounded-full animate-ping" style={{animationDuration: '2s'}}></div>
					</div>
					<span className="text-sm sm:text-base text-muted-foreground font-medium">
						Chào buổi chiều! Thư giãn với những bộ phim hấp dẫn
					</span>
				</>
			)}
			{isEvening && (
				<>
					<div className="relative">
						<Moon className="w-6 h-6 text-blue-300 animate-pulse" />
						<div className="absolute -inset-1">
							<div className="w-full h-full bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
						</div>
						<div className="absolute top-0 right-0 w-2 h-2 bg-white/60 rounded-full animate-ping" style={{animationDuration: '4s'}}></div>
					</div>
					<span className="text-sm sm:text-base text-muted-foreground font-medium">
						Chào buổi tối! Chúc bạn xem phim vui vẻ
					</span>
				</>
			)}
		</div>
	)
}