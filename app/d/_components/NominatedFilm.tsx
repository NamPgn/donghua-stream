import { AnimationCard } from "@/components/animation-card";
import { getCategoryNominated } from "@/services/anime.server";

interface NominatedFilmProp {
    seriesId: string;
    categoryId: string;
}

interface NominatedFilmDataProp {
    _id: string;
    name: string;
    anotherName: string;
    slug: string;
    linkImg: string;
    des: string;
    sumSeri: string;
    products: []
    type: string;
    year: string;
    time: string;
    quality: string;
    lang: string;
    isMovie: string;
    up: number;
}

export default async function NominatedFilm({ seriesId, categoryId }: NominatedFilmProp) {
    const data = await getCategoryNominated(seriesId, categoryId);
    
    if (!data?.data?.length) {
        return null;
    }

    return (
        <section className="mt-12">
            <h2 className="text-xl font-semibold mb-6">Phim Liên Quan</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
                {data.data.map((anime: NominatedFilmDataProp) => (
                    <AnimationCard key={anime._id} anime={anime} />
                ))}
            </div>
        </section>
    );
}
