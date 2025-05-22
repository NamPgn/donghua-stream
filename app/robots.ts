import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/anime/*"],
      disallow: ["/api/*", "/admin/*", "/search", "/profile/*", "/login", "/register", "/reset-password"],
    },
    sitemap: process.env.NEXT_PUBLIC_SITE_URL + "/sitemap.xml",
  }
}
