import { api } from "../lib/api"




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
            


    }
}