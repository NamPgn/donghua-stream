"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import CryptoJS from "crypto-js"

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

  const playerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!anime) {
      setVideoSource(null)
      return
    }

    switch (currentServer) {
      case "dailymotion":
        if (anime.dailyMotionServer) {
          try {
            const secretKey = process.env.NEXT_PUBLIC_SECERT_CRYPTO_KEY_PRODUCTS_DAILYMOTION_SERVER || ""
            const decodedData = CryptoJS.AES.decrypt(
              anime.dailyMotionServer,
              secretKey
            ).toString(CryptoJS.enc.Utf8)
            
            if (decodedData) {
              setVideoSource(decodedData)
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
          return
        }
        break
      case "link":
        if (anime.link) {
          setVideoSource(anime.link)
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
  }, [anime, currentServer])

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={playerRef}
        className={`relative w-full bg-black rounded-lg overflow-hidden aspect-video`}
      >
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
            No video source available
          </div>
        )}

        {/* Copyright Notice */}
        {episode && episode.copyright && (
          <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {episode.copyright}
          </div>
        )}
      </div>

      {/* Server Selection Buttons */}
      <div className="flex gap-2 justify-center m-3">
        <button
          onClick={() => setCurrentServer("dailymotion")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            currentServer === "dailymotion"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          #Server 1
        </button>
        <button
          onClick={() => setCurrentServer("server2")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            currentServer === "server2"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          #Server 2
        </button>
        <button
          onClick={() => setCurrentServer("link")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            currentServer === "link"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          #Server 3
        </button>
      </div>
    </div>
  )
}
