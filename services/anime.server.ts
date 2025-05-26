import { notFound } from "next/navigation"
import { API_BASE_URL, API_ENDPOINTS, CACHE_SETTINGS, DEFAULT_HEADERS, ERROR_MESSAGES, TIMEOUT } from "../constant"

export async function getAnimeData(slug: string) {
    try {
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CATEGORY}/${slug}`, {
            cache: CACHE_SETTINGS.NO_CACHE,
            headers: DEFAULT_HEADERS,
        })

        if (!res.ok) {
            console.error(`Failed to fetch anime data: ${res.status} ${res.statusText}`)
            return null
        }

        const data = await res.json()

        if (!data) {
            console.error(ERROR_MESSAGES.NO_DATA)
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
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCT}/${slug}`, {
            cache: CACHE_SETTINGS.NO_CACHE,
            headers: DEFAULT_HEADERS,
        })

        if (!res.ok) {
            console.error(`Failed to fetch anime data: ${res.status} ${res.statusText}`)
            return null
        }

        const data = await res.json()

        if (!data) {
            console.error(ERROR_MESSAGES.NO_DATA)
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
            `${API_BASE_URL}${API_ENDPOINTS.CATEGORIES_NOMINATED}?${queryParams}`,
            {
                method: "GET",
                next: {
                    revalidate: CACHE_SETTINGS.REVALIDATE_3600
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
        return { data: [], error: ERROR_MESSAGES.CATEGORY_NOMINATED_FAILED };
    }
}

export async function fetchCategorySitemap() {
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.CATEGORY_SITEMAP}`,
        {
          method: "GET",
          cache: CACHE_SETTINGS.NO_CACHE,
          signal: AbortSignal.timeout(TIMEOUT.DEFAULT)
        }
      );
      if (!response.ok) {
        notFound();
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error fetching category sitemap:', error);
      if (error.name === 'AbortError') {
        return { data: [], error: ERROR_MESSAGES.REQUEST_TIMEOUT };
      }
      return { data: [], error: ERROR_MESSAGES.CATEGORY_SITEMAP_FAILED };
    }
  }