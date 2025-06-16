import { useQuery } from "@tanstack/react-query"
import { scheduleApi } from "@/services/api/schedule.api"

export const useSchedule = (week: string) => {
  const { data: schedule, isLoading } = useQuery({
    queryKey: ["schedule", week],
    queryFn: () => scheduleApi.getByWeek(week),
  })

  return {
    schedule,
    isLoading,
  }
} 