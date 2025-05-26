import MVLink from "../Link";
import MVImage from "../ui/image";

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

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <MVLink href={`/categories/${category.slug}`}>
      <div className="group relative overflow-hidden rounded-lg">
        <div className="aspect-[2/3] relative">
          <MVImage
            src={category.linkImg}
            alt={category.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-medium line-clamp-1">{category.name}</h3>
          <p className="text-white/80 text-sm">Tập {category?.lastProduct?.seri}</p>
        </div>
      </div>
    </MVLink>
  )
} 