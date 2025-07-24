"use client"
import React from "react"
import { useState, useRef, useEffect } from "react"
import CryptoJS from "crypto-js"
import { Monitor, Cloud, Link, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { CombiningEpisode } from "@/app/xem-phim/[slug]/watch-client"

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
  voiceOverLink?: string
  voiceOverLink2?: string
}

interface VideoPlayerProps {
  anime: Anime
  episode: Product
  combiningEpisodes: CombiningEpisode | null
}

export function VideoPlayer({ anime, episode, combiningEpisodes }: VideoPlayerProps) {
  const [videoSource, setVideoSource] = useState<string | null>(null)
  const [currentServer, setCurrentServer] = useState<"dailymotion" | "server2" | "link" | "voiceOverLink" | "voiceOverLink2">("dailymotion")
  const [isLoading, setIsLoading] = useState(true)
  const [adBlockEnabled, setAdBlockEnabled] = useState(true)
  const [showAdBlockStatus, setShowAdBlockStatus] = useState(true)
  const playerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const blockAdsAndPopups = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        const iframeDoc = iframeRef.current.contentWindow.document
        
        const adSelectors = [
          '[id*="ad"]',
          '[class*="ad"]',
          '[class*="advertisement"]',
          '[class*="popup"]',
          '[class*="overlay"]',
          '.ad-container',
          '.ads',
          '.advertisement',
          '.popup-overlay',
          '.modal-overlay'
        ]

        adSelectors.forEach(selector => {
          const elements = iframeDoc.querySelectorAll(selector)
          elements.forEach(el => {
            if (el instanceof HTMLElement) {
              el.style.display = 'none !important'
              el.remove()
            }
          })
        })

        // Chặn window.open (popup)
        iframeRef.current.contentWindow.open = () => null

        // Chặn các sự kiện click không mong muốn
        iframeDoc.addEventListener('click', (e) => {
          const target = e.target as HTMLElement
          if (target.tagName === 'A' && target.getAttribute('target') === '_blank') {
            e.preventDefault()
            e.stopPropagation()
          }
        }, true)

      } catch {
        // Cross-origin restrictions - không thể truy cập iframe content
        console.log('Cannot access iframe content due to CORS policy')
      }
    }
  }

  useEffect(() => {
    if (!anime) {
      setVideoSource(null)
      return
    }

    setIsLoading(true)

    // Check if we have a combining episode first
    if (combiningEpisodes && combiningEpisodes.link1) {
      setVideoSource(addAdBlockParams(combiningEpisodes.link1))
      setIsLoading(false)
      return
    }

    switch (currentServer) {
      case "dailymotion":
        if (anime.dailyMotionServer) {
          try {
            const secretKey = process.env.NEXT_PUBLIC_SECERT_CRYPTO_KEY_PRODUCTS_DAILYMOTION_SERVER || ""
            const decodedData = CryptoJS.AES.decrypt(anime.dailyMotionServer, secretKey).toString(CryptoJS.enc.Utf8)

            if (decodedData) {
              // Thêm tham số để giảm quảng cáo
              const enhancedUrl = addAdBlockParams(decodedData)
              setVideoSource(enhancedUrl)
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
          const enhancedUrl = addAdBlockParams(anime.server2)
          setVideoSource(enhancedUrl)
          setIsLoading(false)
          return
        }
        break
      case "link":
        if (anime.link) {
          const enhancedUrl = addAdBlockParams(anime.link)
          setVideoSource(enhancedUrl)
          setIsLoading(false)
          return
        }
        break
      case "voiceOverLink":
        if (anime.voiceOverLink) {
          const enhancedUrl = addAdBlockParams(anime.voiceOverLink)
          setVideoSource(enhancedUrl)
          setIsLoading(false)
          return
        }
        break
    }

    // If current server failed, try others
    if (anime.server2) {
      setVideoSource(addAdBlockParams(anime.server2))
    } else if (anime.link) {
      setVideoSource(addAdBlockParams(anime.link))
    } else {
      setVideoSource(null)
    }
    setIsLoading(false)
  }, [anime, currentServer, combiningEpisodes])

  // Hàm thêm tham số chặn quảng cáo vào URL
  const addAdBlockParams = (url: string): string => {
    if (!adBlockEnabled) return url
    
    try {
      const urlObj = new URL(url)
      
      // Các tham số để giảm quảng cáo
      const adBlockParams = {
        'autoplay': '1',
        'mute': '0',
        'controls': '1',
        'modestbranding': '1', // YouTube
        'rel': '0', // YouTube
        'showinfo': '0', // YouTube
        'iv_load_policy': '3', // YouTube
        'disablekb': '0',
        'fs': '1',
        'playsinline': '1',
        'widget': '1',
        'app': 'embed'
      }

      Object.entries(adBlockParams).forEach(([key, value]) => {
        urlObj.searchParams.set(key, value)
      })

      return urlObj.toString()
    } catch {
      return url
    }
  }

  // Effect để chặn quảng cáo sau khi iframe load
  useEffect(() => {
    if (videoSource && adBlockEnabled) {
      const timer = setTimeout(() => {
        blockAdsAndPopups()
      }, 2000) // Chờ 2 giây để iframe load xong

      return () => clearTimeout(timer)
    }
  }, [videoSource, adBlockEnabled])

  // Effect để ẩn ad block status sau 3s
  useEffect(() => {
    if (adBlockEnabled) {
      setShowAdBlockStatus(true)
      const timer = setTimeout(() => {
        setShowAdBlockStatus(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [adBlockEnabled])

  type ServerType = {
    id: "dailymotion" | "server2" | "link" | "voiceOverLink" | "voiceOverLink2";
    name: string;
    icon: React.ReactNode;
    tooltip: string;
  };

  const getAvailableServers = (data: any): ServerType[] => {
    const servers: ServerType[] = [];
    
    if (data.dailyMotionServer) {
      servers.push({
        id: "dailymotion",
        name: "Vietsub #1",
        icon: <Monitor className="h-3 w-3" />,
        tooltip: "Primary server (DailyMotion)",
      });
    }

    if (data.server2) {
      servers.push({
        id: "server2", 
        name: "Vietsub #2", 
        icon: <Cloud className="h-3 w-3" />,
        tooltip: "Backup server"
      });
    }

    if (data.link) {
      servers.push({
        id: "link",
        name: "Vietsub #3",
        icon: <Link className="h-3 w-3" />,
        tooltip: "Alternative source"
      });
    }

    if (data.voiceOverLink) {
      servers.push({
        id: "voiceOverLink",
        name: "Thuyết minh #1",
        icon: <Link className="h-3 w-3" />,
        tooltip: "Alternative source"
      });
    }

    if (data.voiceOverLink2) {
      servers.push({
        id: "voiceOverLink2",
        name: "Thuyết minh #2",
        icon: <Link className="h-3 w-3" />,
        tooltip: "Alternative source"
      });
    }

    return servers;
  };

  const availableServers = getAvailableServers(anime);

  return (
    <div className="flex flex-col gap-2">
      <div ref={playerRef} className="relative w-full bg-black rounded-lg overflow-hidden aspect-video">
        {/* Video iframe */}
        {videoSource ? (
          <iframe
            ref={iframeRef}
            src={videoSource}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
            onLoad={adBlockEnabled ? blockAdsAndPopups : undefined}
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

        {/* Ad Block Status */}
        {adBlockEnabled && (
          <div 
            className={cn(
              "absolute top-4 left-4 bg-green-600/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1 transition-opacity duration-300",
              showAdBlockStatus ? "opacity-100" : "opacity-0"
            )}
          >
            <Shield className="h-3 w-3" />
            <span>Ad Block ON</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Server Selection */}
        <div className="flex gap-2">
          {availableServers.map((server) => (
            <button
              key={server.id}
              onClick={() => setCurrentServer(server.id)}
              className={cn(
                "flex items-center px-3 py-1.5 rounded text-xs font-medium transition-all",
                currentServer === server.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                combiningEpisodes ? "opacity-50 cursor-not-allowed" : ""
              )}
              title={server.tooltip}
              disabled={!!combiningEpisodes}
            >
              {server.icon}
              <span className="ml-1">{server.name}</span>
            </button>
          ))}
        </div>

        {/* Ad Block Toggle */}
        <button
          onClick={() => setAdBlockEnabled(!adBlockEnabled)}
          className={cn(
            "flex items-center px-3 py-1.5 rounded text-xs font-medium transition-all",
            adBlockEnabled 
              ? "bg-green-600 text-white hover:bg-green-700" 
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          )}
          title={adBlockEnabled ? "Disable ad blocking" : "Enable ad blocking"}
        >
          <Shield className="h-3 w-3 mr-1" />
          {adBlockEnabled ? "Ad Block ON" : "Ad Block OFF"}
        </button>
      </div>
    </div>
  )
}