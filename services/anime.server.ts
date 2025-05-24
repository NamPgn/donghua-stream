import { notFound } from "next/navigation"

export async function getAnimeData(slug: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category/${slug}`, {
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!res.ok) {
            console.error(`Failed to fetch anime data: ${res.status} ${res.statusText}`)
            return null
        }

        const data = await res.json()

        if (!data) {
            console.error('No data received from API')
            return null
        }

        return data
    } catch (error) {
        console.error('Error fetching anime data:', error)
        return null
    }
}

export async function getAnimeEpisode(slug: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${slug}`, {
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!res.ok) {
            console.error(`Failed to fetch anime data: ${res.status} ${res.statusText}`)
            return null
        }

        const data = await res.json()

        if (!data) {
            console.error('No data received from API')
            return null
        }

        return data
    } catch (error) {
        console.error('Error fetching anime data:', error)
        return null
    }
}

export async function getCategoryNominated(seriesId: string, categoryId: string) {
    try {
        const queryParams = new URLSearchParams();
        if (seriesId) queryParams.append('seriesId', seriesId);
        if (categoryId) queryParams.append('categoryId', categoryId);
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/nominated?${queryParams}`,
            {
                method: "GET",
                next: {
                    revalidate: 3600
                }
            }
        );
        if (!response.ok) {
            notFound();
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching category nominated:', error);
        return { data: [], error: "Failed to fetch category nominated" };
    }
}