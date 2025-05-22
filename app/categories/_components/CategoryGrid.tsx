'use client'
import { Button } from "@/components/ui/button";
import { useSeriesBySlug } from "@/hooks/useSeries";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CategoryCard } from "@/components/category/CategoryCard";

interface Category {
  _id: string;
  name: string;
  linkImg: string;
  des: string;
  sumSeri: string;
  slug: string;
  lastProduct: {
    _id: string;
    slug: string;
    seri: string;
  };
}


interface CategoryGridProps {
  category: string;
}

export function CategoryGrid({ category }: CategoryGridProps) {
  const { data: seriesByCategory } = useSeriesBySlug(category);
  
  return (
    <>
      <div className="flex items-center gap-2 mb-6">
        <Link href="/categories">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Quay lại danh mục
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Thể Loại {seriesByCategory?.data.name}</h1>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground">
          Tìm thấy {seriesByCategory?.data?.categories?.length || 0} phim thuộc thể loại {seriesByCategory?.data.name}
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {seriesByCategory?.data?.categories?.map((category: Category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </>
  )
} 