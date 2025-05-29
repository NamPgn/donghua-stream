"use client"
import { useState, useRef, useEffect } from "react"
import CryptoJS from "crypto-js"
import { Monitor, Cloud, Link, Shield, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { LINK_DOMAIN_SERVER_CLOUD, SELECTOR_ADLINK } from "@/constant/social.constant"

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
  const [selectedUrl, setSelectedUrl] = useState<string>("")
  const [currentServer, setCurrentServer] = useState<"dailymotion" | "server2" | "link">("dailymotion")
  const [isLoading, setIsLoading] = useState(true)
  const [adBlockEnabled, setAdBlockEnabled] = useState(true)
  const [showIndicator, setShowIndicator] = useState(true)
  const [isShortcutLink, setIsShortcutLink] = useState(false)
  const playerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)


  // Kiểm tra xem URL có phải là shortcut link không
  const checkIfShortcutLink = (url: string): boolean => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.toLowerCase()

      return LINK_DOMAIN_SERVER_CLOUD.some(domain =>
        hostname === domain || hostname.endsWith('.' + domain)
      )
    } catch {
      return false
    }
  }

  // Hàm để chặn popup và quảng cáo cho video server tự host (chỉ khi không phải shortcut)
  const blockAdsAndPopups = () => {
    if (isShortcutLink) {
      console.log('Shortcut link detected - allowing ads to pass through')
      return
    }

    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        const iframeDoc = iframeRef.current.contentWindow.document
        const iframeWindow = iframeRef.current.contentWindow

        // Chặn các sự kiện video
        const blockVideoEvents = () => {
          const videoElements = iframeDoc.getElementsByTagName('video')
          Array.from(videoElements).forEach(video => {
            // Chặn các sự kiện video
            const videoEvents = [
              'play', 'pause', 'seeking', 'seeked', 'timeupdate',
              'volumechange', 'ratechange', 'ended', 'waiting',
              'canplay', 'canplaythrough', 'loadedmetadata',
              'loadeddata', 'stalled', 'suspend', 'abort',
              'error', 'emptied', 'loadedmetadata', 'loadeddata'
            ]

            videoEvents.forEach(event => {
              video.addEventListener(event, () => {
                // Chặn popup sau khi sự kiện video xảy ra
                setTimeout(() => {
                  const popups = iframeDoc.querySelectorAll('[class*="popup"], [class*="modal"], [class*="overlay"]')
                  popups.forEach(popup => {
                    if (popup instanceof HTMLElement) {
                      popup.remove()
                    }
                  })
                }, 100)
              }, true)
            })

            // Override các phương thức video
            const originalPlay = video.play
            video.play = function() {
              const result = originalPlay.apply(this)
              // Chặn popup sau khi play
              setTimeout(() => {
                const popups = iframeDoc.querySelectorAll('[class*="popup"], [class*="modal"], [class*="overlay"]')
                popups.forEach(popup => {
                  if (popup instanceof HTMLElement) {
                    popup.remove()
                  }
                })
              }, 100)
              return result
            }

            const originalPause = video.pause
            video.pause = function() {
              const result = originalPause.apply(this)
              // Chặn popup sau khi pause
              setTimeout(() => {
                const popups = iframeDoc.querySelectorAll('[class*="popup"], [class*="modal"], [class*="overlay"]')
                popups.forEach(popup => {
                  if (popup instanceof HTMLElement) {
                    popup.remove()
                  }
                })
              }, 100)
              return result
            }
          })
        }

        // Chặn tất cả các phương thức mở popup
        const blockPopupMethods = () => {
          // Override window.open
          iframeWindow.open = function() {
            console.log('Blocked popup attempt via window.open')
            return null
          }

          // Override window.alert, confirm, prompt
          iframeWindow.alert = () => {}
          iframeWindow.confirm = () => false
          iframeWindow.prompt = () => null

          // Override window.location
          const originalLocation = iframeWindow.location
          Object.defineProperty(iframeWindow, 'location', {
            get: () => originalLocation,
            set: (value) => {
              console.log('Blocked location change:', value)
              return false
            }
          })

          // Override window.focus
          iframeWindow.focus = () => {}

          // Override window.blur
          iframeWindow.blur = () => {}

          // Override window.moveTo, moveBy, resizeTo, resizeBy
          iframeWindow.moveTo = () => {}
          iframeWindow.moveBy = () => {}
          iframeWindow.resizeTo = () => {}
          iframeWindow.resizeBy = () => {}

          // Override window.scrollTo, scrollBy
          iframeWindow.scrollTo = () => {}
          iframeWindow.scrollBy = () => {}

          // Override window.postMessage
          iframeWindow.postMessage = () => {}

          // Override window.addEventListener
          const originalAddEventListener = iframeWindow.addEventListener
          iframeWindow.addEventListener = function(
            type: 'beforeunload' | 'unload' | 'blur' | 'focus' | string,
            listener: EventListenerOrEventListenerObject,
            options?: boolean | AddEventListenerOptions
          ) {
            if (type === 'beforeunload' || type === 'unload' || type === 'blur' || type === 'focus') {
              return
            }
            return originalAddEventListener.call(this, type, listener, options)
          }

          // Override window.onbeforeunload
          Object.defineProperty(iframeWindow, 'onbeforeunload', {
            get: () => null,
            set: () => {}
          })

          // Override window.onunload
          Object.defineProperty(iframeWindow, 'onunload', {
            get: () => null,
            set: () => {}
          })

          // Override window.onblur
          Object.defineProperty(iframeWindow, 'onblur', {
            get: () => null,
            set: () => {}
          })

          // Override window.onfocus
          Object.defineProperty(iframeWindow, 'onfocus', {
            get: () => null,
            set: () => {}
          })

          // Override window.onclick
          Object.defineProperty(iframeWindow, 'onclick', {
            get: () => null,
            set: () => {}
          })

          // Override window.oncontextmenu
          Object.defineProperty(iframeWindow, 'oncontextmenu', {
            get: () => null,
            set: () => {}
          })

          // Override window.setTimeout và setInterval
          const originalSetTimeout = iframeWindow.setTimeout
          iframeWindow.setTimeout = function(callback, delay: number, ...args) {
            if (typeof callback === 'string' && (
              callback.includes('window.open') ||
              callback.includes('popup') ||
              callback.includes('alert') ||
              callback.includes('confirm')
            )) {
              return 0
            }
            return originalSetTimeout.call(this, callback, delay, ...args)
          }

          const originalSetInterval = iframeWindow.setInterval
          iframeWindow.setInterval = function(callback, delay: number, ...args) {
            if (typeof callback === 'string' && (
              callback.includes('window.open') ||
              callback.includes('popup') ||
              callback.includes('alert') ||
              callback.includes('confirm')
            )) {
              return 0
            }
            return originalSetInterval.call(this, callback, delay, ...args)
          }
        }

        // Chặn các sự kiện có thể gây popup
        const blockEvents = () => {
          const events = [
            'beforeunload', 'unload', 'blur', 'focus',
            'click', 'dblclick', 'contextmenu', 'mousedown',
            'mouseup', 'mousemove', 'keydown', 'keyup',
            'keypress', 'submit', 'change', 'select',
            'load', 'DOMContentLoaded', 'readystatechange',
            'play', 'pause', 'seeking', 'seeked', 'timeupdate',
            'volumechange', 'ratechange', 'ended', 'waiting'
          ]

          events.forEach(event => {
            iframeDoc.addEventListener(event, (e) => {
              const target = e.target as HTMLElement
              
              // Chặn click vào các element quảng cáo
              if (target.closest('[class*="overlay"], [class*="ad"], [class*="popup"], [class*="modal"]')) {
                e.preventDefault()
                e.stopPropagation()
                return false
              }

              // Chặn click vào các link mở popup
              if (target.tagName === 'A' && (
                target.getAttribute('target') === '_blank' ||
                target.getAttribute('onclick')?.includes('window.open') ||
                target.getAttribute('onclick')?.includes('popup') ||
                target.getAttribute('href')?.startsWith('javascript:') ||
                target.getAttribute('href')?.startsWith('data:')
              )) {
                e.preventDefault()
                e.stopPropagation()
                return false
              }

              // Chặn các sự kiện có thể gây popup
              if (event === 'beforeunload' || event === 'unload' || event === 'blur' || event === 'focus') {
                e.preventDefault()
                e.stopPropagation()
                return false
              }

              // Chặn popup sau khi sự kiện xảy ra
              setTimeout(() => {
                const popups = iframeDoc.querySelectorAll('[class*="popup"], [class*="modal"], [class*="overlay"]')
                popups.forEach(popup => {
                  if (popup instanceof HTMLElement) {
                    popup.remove()
                  }
                })
              }, 100)
            }, true)
          })
        }

        // Chặn các script có thể gây popup
        const blockScripts = () => {
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                  if (node instanceof HTMLScriptElement) {
                    const scriptContent = node.textContent || ''
                    if (scriptContent.includes('window.open') || 
                        scriptContent.includes('popup') ||
                        scriptContent.includes('alert') ||
                        scriptContent.includes('confirm') ||
                        scriptContent.includes('location.href') ||
                        scriptContent.includes('location.replace') ||
                        scriptContent.includes('location.assign')) {
                      node.remove()
                    }
                  } else if (node instanceof HTMLElement) {
                    // Xóa các element có thể gây popup
                    if (node.getAttribute('onclick')?.includes('window.open') ||
                        node.getAttribute('onclick')?.includes('popup') ||
                        node.getAttribute('onload')?.includes('window.open') ||
                        node.getAttribute('onload')?.includes('popup')) {
                      node.remove()
                    }
                  }
                })
              }
            })
          })

          observer.observe(iframeDoc.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['onclick', 'onload', 'onbeforeunload', 'onunload', 'onblur', 'onfocus']
          })

          return observer
        }

        // Xóa các element quảng cáo và popup
        const removeAds = () => {
          // Xóa các element theo selector
          SELECTOR_ADLINK.forEach(selector => {
            const elements = iframeDoc.querySelectorAll(selector)
            elements.forEach(el => {
              if (el instanceof HTMLElement) {
                el.style.cssText = `
                  display: none !important;
                  visibility: hidden !important;
                  opacity: 0 !important;
                  pointer-events: none !important;
                  position: absolute !important;
                  z-index: -9999 !important;
                  width: 0 !important;
                  height: 0 !important;
                  overflow: hidden !important;
                `
                el.remove()
              }
            })
          })

          // Xóa các iframe quảng cáo
          const iframes = iframeDoc.getElementsByTagName('iframe')
          Array.from(iframes).forEach(iframe => {
            const src = iframe.src.toLowerCase()
            if (src.includes('ad') || src.includes('banner') || src.includes('popup') || 
                src.includes('promo') || src.includes('sponsored')) {
              iframe.remove()
            }
          })

          // Xóa các element có style position: fixed hoặc absolute
          const fixedElements = iframeDoc.querySelectorAll('div[style*="position: fixed"], div[style*="position:absolute"]')
          fixedElements.forEach(el => {
            if (el instanceof HTMLElement) {
              el.remove()
            }
          })
        }

        // Áp dụng tất cả các biện pháp chặn
        blockPopupMethods()
        blockEvents()
        blockVideoEvents()
        const scriptObserver = blockScripts()
        removeAds()

        // Chạy removeAds định kỳ với tần suất cao hơn
        const adBlockInterval = setInterval(removeAds, 100)

        // Cleanup sau 1 phút
        setTimeout(() => {
          clearInterval(adBlockInterval)
          scriptObserver.disconnect()
        }, 60000)

      } catch (error) {
        console.log('Cannot access iframe content due to CORS policy:', error)
      }
    }
  }

  useEffect(() => {
    if (!anime) {
      setVideoSource(null)
      setSelectedUrl("")
      return
    }

    setIsLoading(true)
    let newSelectedUrl = ""
    switch (currentServer) {
      case "dailymotion":
        if (anime.dailyMotionServer) {
          try {
            const secretKey = process.env.NEXT_PUBLIC_SECERT_CRYPTO_KEY_PRODUCTS_DAILYMOTION_SERVER || ""
            const decodedData = CryptoJS.AES.decrypt(anime.dailyMotionServer, secretKey).toString(CryptoJS.enc.Utf8)

            if (decodedData) {
              newSelectedUrl = decodedData
            }
          } catch (error) {
            console.error("Error decoding Dailymotion server:", error)
          }
        }
        break
      case "server2":
        if (anime.server2) {
          newSelectedUrl = anime.server2
        }
        break
      case "link":
        if (anime.link) {
          newSelectedUrl = anime.link
        }
        break
    }

    if (newSelectedUrl) {
      setSelectedUrl(newSelectedUrl)
      setIsLoading(false)
      return
    }

    // If current server failed, try others
    if (anime.server2) {
      setSelectedUrl(anime.server2)
    } else if (anime.link) {
      setSelectedUrl(anime.link)
    } else {
      setSelectedUrl("")
    }
    setIsLoading(false)
  }, [anime, currentServer])

  // New effect to handle URL processing and ad blocking
  useEffect(() => {
    if (selectedUrl) {
      const isShortcut = checkIfShortcutLink(selectedUrl)
      setIsShortcutLink(isShortcut)
      const finalUrl = isShortcut ? selectedUrl : addAdBlockParams(selectedUrl)
      setVideoSource(finalUrl)
    } else {
      setVideoSource(null)
      setIsShortcutLink(false)
    }
  }, [selectedUrl])

  // Hàm thêm tham số chặn quảng cáo vào URL cho các server tự host (chỉ khi không phải shortcut)
  const addAdBlockParams = (url: string): string => {
    if (!adBlockEnabled || isShortcutLink) return url

    try {
      const urlObj = new URL(url)

      // Các tham số cho video server tự host
      const adBlockParams = {
        'autoplay': '1',
        'controls': '1',
        'playsinline': '1',
        'preload': 'metadata',
        'no_ads': '1',
        'ad_block': '1',
        'clean': '1',
        'minimal': '1'
      }

      Object.entries(adBlockParams).forEach(([key, value]) => {
        urlObj.searchParams.set(key, value)
      })

      return urlObj.toString()
    } catch {
      return url
    }
  }
  useEffect(() => {
    if (videoSource && adBlockEnabled && !isShortcutLink) {
      const timer = setTimeout(() => {
        blockAdsAndPopups()
      }, 2000) // Chờ 2 giây để iframe load xong

      return () => clearTimeout(timer)
    }
  }, [videoSource, adBlockEnabled, isShortcutLink, selectedUrl])

  useEffect(() => {
    if (adBlockEnabled && !isShortcutLink) {
      setShowIndicator(true)
      const timer = setTimeout(() => {
        setShowIndicator(false)
      }, 3000)
      return () => clearTimeout(timer)
    } else {
      setShowIndicator(false)
    }
  }, [adBlockEnabled, isShortcutLink])

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
    <div className="relative flex flex-col gap-2 relative">
      <div ref={playerRef} className=" w-full bg-black rounded-lg aspect-video">
        {/* Video iframe */}
        {videoSource ? (
          <iframe
            ref={iframeRef}
            src={videoSource}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            sandbox="allow-scripts allow-same-origin allow-presentation allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
            onLoad={adBlockEnabled && !isShortcutLink ? blockAdsAndPopups : undefined}
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
        {adBlockEnabled && !isShortcutLink && (
          <div className={`absolute top-2 left-2 bg-green-600/80 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex items-center gap-0.5 sm:gap-1 z-50 transition-opacity duration-300 ${showIndicator ? 'opacity-100' : 'opacity-0'}`}>
            <Shield className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            <span>Ad Block On</span>
          </div>
        )}

        {/* Shortcut Link Warning */}
        {isShortcutLink && (
          <div className="absolute top-2 left-2 bg-orange-600/80 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex items-center gap-0.5 sm:gap-1 z-50">
            <AlertTriangle className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            <span>Shortcut Link - Ads Allowed</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        {/* Server Selection */}
        <div className="flex gap-2">
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
          disabled={isShortcutLink}
        >
          <Shield className="h-3 w-3 mr-1" />
          {isShortcutLink ? "Shortcut Detected" : (adBlockEnabled ? "Ad Block ON" : "Ad Block OFF")}
        </button>
      </div>

      {/* Link Type Info */}
      {isShortcutLink && (
        <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
          ⚠️ Shortcut link detected. Ads will be displayed to support the link provider.
        </div>
      )}
    </div>
  )
}