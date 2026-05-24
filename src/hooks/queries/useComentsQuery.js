
import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../services/api-service";



export function useUserQuery(postId) {

    return useQuery({
        queryKey: ['posts', postId],
        queryFn: () => apiService.getCommentsByPost(postId)
    })
}