
import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../services/api-service";



export function useUserQuery(userId) {

    return useQuery({
        queryKey: ['posts', userId],
        queryFn: () => apiService.getPostByUser(userId)
    })
}