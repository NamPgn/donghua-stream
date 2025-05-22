"use client"
import { useState, useRef, useEffect } from "react"
import CryptoJS from "crypto-js"
import { Monitor, Cloud, Link } from "lucide-react"
import { cn } from "@/lib/utils"

interface Product {
  _id: string
  seri: string
  isApproved: boolean
  view: number
  copyright?: string
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
  category: Category
  copyright: string
  dailyMotionServer?: string
  server2?: string
  link?: string
}

interface VideoPlayerProps {
  anime: Anime
  episode: Product
}

export function VideoPlayer({ anime, episode }: VideoPlayerProps) {
  const [videoSource, setVideoSource] = useState<string | null>(null)
  const [currentServer, setCurrentServer] = useState<"dailymotion" | "server2" | "link">("dailymotion")
  const [isLoading, setIsLoading] = useState(true)

  const playerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!anime) {
      setVideoSource(null)
      return
    }

    setIsLoading(true)

    switch (currentServer) {
      case "dailymotion":
        if (anime.dailyMotionServer) {
          try {
            const secretKey = process.env.NEXT_PUBLIC_SECERT_CRYPTO_KEY_PRODUCTS_DAILYMOTION_SERVER || ""
            const decodedData = CryptoJS.AES.decrypt(anime.dailyMotionServer, secretKey).toString(CryptoJS.enc.Utf8)

            if (decodedData) {
              setVideoSource(decodedData)
              setIsLoading(false)
              return
            }
          } catch (error) {
            console.error("Error decoding Dailymotion server:", error)
          }
        }
        break
      case "server2":
        if (anime.server2) {
          setVideoSource(anime.server2)
          setIsLoading(false)
          return
        }
        break
      case "link":
        if (anime.link) {
          setVideoSource(anime.link)
          setIsLoading(false)
          return
        }
        break
    }

    // If current server failed, try others
    if (anime.server2) {
      setVideoSource(anime.server2)
    } else if (anime.link) {
      setVideoSource(anime.link)
    } else {
      setVideoSource(null)
    }
    setIsLoading(false)
  }, [anime, currentServer])

  const servers = [
    {
      id: "dailymotion",
      name: "Server 1",
      icon: <Monitor className="h-3 w-3" />,
      tooltip: "Primary server (DailyMotion)",
    },
    { id: "server2", name: "Server 2", icon: <Cloud className="h-3 w-3" />, tooltip: "Backup server" },
    { id: "link", name: "Server 3", icon: <Link className="h-3 w-3" />, tooltip: "Alternative source" },
  ] as const

  return (
    <div className="flex flex-col gap-2">
      <div ref={playerRef} className="relative w-full bg-black rounded-lg overflow-hidden aspect-video">
        {/* Video iframe */}
        {videoSource ? (
          <iframe
            src={videoSource}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-black text-white">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-2"></div>
                <p>Loading video...</p>
              </div>
            ) : (
              "No video source available"
            )}
          </div>
        )}

        {/* Copyright Notice */}
        {episode && episode.copyright && (
          <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {episode.copyright}
          </div>
        )}
      </div>

      {/* Compact Server Selection */}
      <div className="flex justify-center gap-2 mt-2">
        {servers.map((server) => (
          <button
            key={server.id}
            onClick={() => setCurrentServer(server.id)}
            className={cn(
              "flex items-center px-3 py-1.5 rounded text-xs font-medium transition-all",
              currentServer === server.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            )}
            title={server.tooltip}
          >
            {server.icon}
            <span className="ml-1">{server.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
