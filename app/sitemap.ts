import { fetchCategorySitemap } from "@/services/anime.server";
import type { MetadataRoute } from "next";

interface Product {
  slug: string;
}

interface Category {
  slug: string;
  products: Product[];
}

const generateSitemapXML = async (): Promise<MetadataRoute.Sitemap> => {
  const categorys: { data: Category[] } = await fetchCategorySitemap(); 

  const sitemap: MetadataRoute.Sitemap = [];

  categorys?.data?.forEach((item) => {
    sitemap.push({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/phim/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    });

    // item.products.forEach((product) => {
    //   sitemap.push({
    //     url: `${process.env.NEXT_PUBLIC_SITE_URL}/xem-phim/${product?.slug}`,
    //     lastModified: new Date(),
    //     changeFrequency: "daily",
    //     priority: 0.8,
    //   });
    // });
  });

  return sitemap;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const data = await generateSitemapXML();
    return data;
  } catch {
    return []
  }
}
