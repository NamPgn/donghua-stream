import tagsApi from "@/services/api/tags.api";
import { useQuery } from "@tanstack/react-query";

export function useTags() {
    return useQuery({
        queryKey: ['search'],
        queryFn: () => tagsApi.getAllTags(),
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
    });
} 