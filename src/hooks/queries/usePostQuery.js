
import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../services/api-service";



export function usePostQuery(userId) {

    return useQuery({
        queryKey: ['posts', userId],
        queryFn: () => apiService.getPostByUser(userId),
        enabled: !!userId, // A query só é executada se userId for válido (não nulo ou indefinido)
    })
}