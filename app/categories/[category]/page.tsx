import { CategoryGrid } from "@/app/categories/_components/CategoryGrid"

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  return (
    <div className="min-h-screen bg-background">
      <main className="container py-8 mx-auto px-2 md:px-0">
        <CategoryGrid category={category} />
      </main>
    </div>
  );
}
