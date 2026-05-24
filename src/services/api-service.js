import { api } from "../lib/api"
import { API_ROUTES } from "../constants/apiRoutes"


const handleError = (error, fallback) => {
    if (error instanceof Error && error.response) {
        const message = error.response.data?.message;

        throw new Error(
            Array.isArray(message) ? message.join(', ') : message || fallback
        )
    }

    throw new Error('Ocorreu um erro inesperado')
}

export const apiService = {
  
    async getUsers() {
        
        try {
            const response = await api.get(API_ROUTES.USERS);
            return response.data;
        } catch (error) {
            handleError(error, 'Falha ao buscar usuários');
        }

    },

    async getPostByUser(userId) {
        try {
            const response = await api.get(`${API_ROUTES.POSTS}?userId=${userId}`);
            return response.data;
        } catch (error) {
            handleError(error, 'Falha ao buscar posts do usuário');
        }
    },

    async getCommentsByPost(postId) {
        try {
            const response = await api.get(`${API_ROUTES.COMMENTS}?postId=${postId}`);
            return response.data;
        } catch (error) {
            handleError(error, 'Falha ao buscar comentários do post');
        }

    }

}