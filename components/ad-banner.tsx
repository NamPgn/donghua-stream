// "use client"

// import { useState, useEffect } from "react"
// import { X } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"

// interface AdBannerProps {
//   position: "header" | "sidebar" | "content" | "footer" | "popup" | "video-overlay" | "between-content" | "bottom"
//   size?: "small" | "medium" | "large" | "banner" | "square" | "video"
//   className?: string
//   closeable?: boolean
//   autoClose?: number
//   priority?: "high" | "medium" | "low"
//   onClose?: () => void
// }

// interface AdData {
//   title: string
//   description: string
//   image: string
//   link: string
//   cta: string
// }

// // Mock ad data - in real app, this would come from an ad server
// const adData: Record<string, AdData> = {
//   header: {
//     title: "Khuyến mãi đặc biệt",
//     description: "Đăng ký Premium để xem không quảng cáo",
//     image: "/placeholder.svg?height=90&width=728",
//     link: "/premium",
//     cta: "Đăng ký ngay",
//   },
//   sidebar: {
//     title: "Game Mobile Hot",
//     description: "Tải ngay game RPG hấp dẫn nhất 2025",
//     image: "/placeholder.svg?height=250&width=300",
//     link: "#",
//     cta: "Tải game",
//   },
//   content: {
//     title: "Thời trang Anime",
//     description: "Bộ sưu tập áo thun anime độc đáo",
//     image: "/placeholder.svg?height=200&width=600",
//     link: "#",
//     cta: "Mua ngay",
//   },
//   footer: {
//     title: "Ứng dụng di động",
//     description: "Tải app AnimeWorld để xem mọi lúc mọi nơi",
//     image: "/placeholder.svg?height=100&width=320",
//     link: "#",
//     cta: "Tải app",
//   },
//   popup: {
//     title: "Ưu đãi có thời hạn!",
//     description: "Giảm 50% gói Premium trong 24h",
//     image: "/placeholder.svg?height=300&width=400",
//     link: "/premium",
//     cta: "Nhận ưu đãi",
//   },
//   video: {
//     title: "Sponsor",
//     description: "Nhà tài trợ chính thức",
//     image: "/placeholder.svg?height=60&width=200",
//     link: "#",
//     cta: "Tìm hiểu thêm",
//   },
//   bottom: {
//     title: "Ưu đãi đặc biệt",
//     description: "Giảm giá 30% cho tất cả các gói Premium",
//     image: "/placeholder.svg?height=90&width=728",
//     link: "/premium",
//     cta: "Mua ngay",
//   },
//   "video-overlay": {
//     title: "Quảng cáo video",
//     description: "Xem video không quảng cáo với Premium",
//     image: "/placeholder.svg?height=60&width=200",
//     link: "/premium",
//     cta: "Nâng cấp ngay",
//   },
// }

// // Helper function to check if ad data exists and is valid
// const isValidAdData = (ad: AdData | undefined): ad is AdData => {
//   return Boolean(ad && ad.title && ad.description && ad.image && ad.link && ad.cta)
// }

// export function AdBanner({
//   position,
//   size = "medium",
//   className = "",
//   closeable = false,
//   autoClose,
//   priority = "medium",
//   onClose,
// }: AdBannerProps) {
//   const [isVisible, setIsVisible] = useState(true)
//   const [isLoaded, setIsLoaded] = useState(false)

//   const ad = adData[position as keyof typeof adData]

//   // Return null if no valid ad data
//   if (!isValidAdData(ad)) {
//     return null
//   }

//   // Auto close functionality
//   useEffect(() => {
//     if (autoClose && autoClose > 0) {
//       const timer = setTimeout(() => {
//         setIsVisible(false)
//         onClose?.()
//       }, autoClose * 1000)
//       return () => clearTimeout(timer)
//     }
//   }, [autoClose, onClose])

//   // Simulate ad loading
//   useEffect(() => {
//     const loadTimer = setTimeout(() => {
//       setIsLoaded(true)
//     }, 500)
//     return () => clearTimeout(loadTimer)
//   }, [])

//   const handleClose = () => {
//     setIsVisible(false)
//     onClose?.()
//   }

//   if (!isVisible) return null

//   const sizeClasses = {
//     small: "h-20 w-full max-w-sm",
//     medium: "h-32 w-full max-w-md",
//     large: "h-48 w-full max-w-lg",
//     banner: "h-24 w-full max-w-4xl",
//     square: "h-64 w-64",
//     video: "h-16 w-full max-w-xs",
//   }

//   const positionClasses = {
//     header:
//       "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border border-blue-200 dark:border-blue-800",
//     sidebar:
//       "bg-gradient-to-b from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border border-green-200 dark:border-green-800",
//     content:
//       "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border border-purple-200 dark:border-purple-800",
//     footer:
//       "bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border border-orange-200 dark:border-orange-800",
//     popup:
//       "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border border-yellow-200 dark:border-yellow-800 shadow-2xl",
//     "video-overlay": "bg-black/80 backdrop-blur-sm border border-white/20",
//     "between-content":
//       "bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950 border border-slate-200 dark:border-slate-800",
//     bottom:
//       "bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950 dark:to-cyan-950 border border-teal-200 dark:border-teal-800 fixed bottom-0 left-0 right-0 z-50",
//   }

//   if (!isLoaded) {
//     return (
//       <div className={`${sizeClasses[size]} ${className} animate-pulse`}>
//         <div className="bg-muted rounded-lg h-full flex items-center justify-center">
//           <div className="text-sm text-muted-foreground">Đang tải quảng cáo...</div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <Card
//       className={`
//       ${sizeClasses[size]} 
//       ${positionClasses[position]} 
//       ${className}
//       relative overflow-hidden group hover:shadow-lg transition-all duration-300
//       ${priority === "high" ? "ring-2 ring-primary/20" : ""}
//     `}
//     >
//       {closeable && (
//         <Button
//           variant="ghost"
//           size="icon"
//           className="absolute top-2 right-2 h-6 w-6 opacity-60 hover:opacity-100 z-10"
//           onClick={handleClose}
//         >
//           <X className="h-4 w-4" />
//         </Button>
//       )}

//       <a
//         href={ad.link}
//         className="block h-full w-full p-4 hover:scale-[1.02] transition-transform duration-300"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         <div className="flex items-center h-full gap-4">
//           <div className="flex-shrink-0">
//             <img
//               src={ad.image || "/placeholder.svg"}
//               alt={ad.title}
//               className="rounded-md object-cover"
//               style={{
//                 width: size === "square" ? "80px" : size === "video" ? "60px" : "100px",
//                 height: size === "square" ? "80px" : size === "video" ? "40px" : "60px",
//               }}
//             />
//           </div>
//           <div className="flex-1 min-w-0">
//             <h3 className="font-semibold text-sm mb-1 line-clamp-1">{ad.title}</h3>
//             <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{ad.description}</p>
//             <Button size="sm" className="text-xs px-3 py-1 h-auto">
//               {ad.cta}
//             </Button>
//           </div>
//         </div>
//       </a>

//       {/* Ad label */}
//       <div className="absolute top-1 left-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded">Quảng cáo</div>
//     </Card>
//   )
// }

// // Popup Ad Component
// export function PopupAd() {
//   const [isVisible, setIsVisible] = useState(false)

//   // Check if popup ad data exists
//   if (!isValidAdData(adData.popup)) {
//     return null
//   }

//   useEffect(() => {
//     // Show popup after 3 seconds
//     const timer = setTimeout(() => {
//       setIsVisible(true)
//     }, 3000)
//     return () => clearTimeout(timer)
//   }, [])

//   const handleClose = () => {
//     setIsVisible(false)
//   }

//   if (!isVisible) return null

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="relative max-w-md w-full">
//         <AdBanner
//           position="popup"
//           size="large"
//           closeable
//           autoClose={10}
//           priority="high"
//           className="w-full"
//           onClose={handleClose}
//         />
//       </div>
//     </div>
//   )
// }

// // Video Overlay Ad Component
// export function VideoOverlayAd({ onClose }: { onClose?: () => void }) {
//   // Check if video overlay ad data exists
//   if (!isValidAdData(adData["video-overlay"])) {
//     return null
//   }

//   return (
//     <div className="absolute top-4 right-4 z-10">
//       <AdBanner position="video-overlay" size="video" closeable className="bg-black/80 text-white" onClose={onClose} />
//     </div>
//   )
// }

// // Bottom Banner Component
// export function BottomBanner() {
//   const [isVisible, setIsVisible] = useState(true)

//   // Check if bottom banner ad data exists
//   if (!isValidAdData(adData.bottom)) {
//     return null
//   }

//   const handleClose = () => {
//     setIsVisible(false)
//   }

//   if (!isVisible) return null

//   return (
//     <AdBanner
//       position="bottom"
//       size="banner"
//       closeable
//       className="fixed bottom-0 left-0 right-0 z-50 !h-[80px] !max-w-none px-4 shadow-lg"
//       onClose={handleClose}
//     />
//   )
// }
