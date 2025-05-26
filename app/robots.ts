import { ANIME_PATHS } from "@/constant/path.constant"
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", `${ANIME_PATHS.BASE}/*`],
      disallow: ["/api/*", "/admin/*", "/search", "/profile/*", "/login", "/register", "/reset-password"],
    },
    sitemap: process.env.NEXT_PUBLIC_SITE_URL + "/sitemap.xml",
  }
}
