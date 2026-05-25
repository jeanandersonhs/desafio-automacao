
import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../services/api-service";


export function useCommentsQuery(postId) {

    return useQuery({
        queryKey: ['comments', postId],
        queryFn: () => apiService.getCommentsByPost(postId),
        enabled: !!postId,
    })
}


export function usePostsWithComments(posts) {

    return useQuery({
        queryKey: ['posts-with-comments', posts?.map(p => p.id) ||[]], // Chave única baseada nos IDs dos posts
        queryFn: () => apiService.getPostWithComments(posts),
        enabled: !!posts && posts.length>0, // A query só é executada se post for válido (não nulo ou indefinido)
    })
}