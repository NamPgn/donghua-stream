import { useQuery } from "@tanstack/react-query"
import { scheduleApi } from "@/services/api/schedule.api"

export const useSchedule = (week: string) => {
  const { data: schedule, isLoading } = useQuery({
    queryKey: ["schedule", week],
    queryFn: () => scheduleApi.getByWeek(week),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  })

  return {
    schedule,
    isLoading,
  }
} 