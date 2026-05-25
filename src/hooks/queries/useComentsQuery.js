
import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../services/api-service";


export function useCommentsQuery(postId) {

    return useQuery({
        queryKey: ['comments', postId],
        queryFn: () => apiService.getCommentsByPost(postId),
        enabled: !!postId,
    })
}