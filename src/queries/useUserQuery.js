
import { useQuery } from "@tanstack/react-query";
import { apiService } from "../services/api-service";



export function useUserQuery() {

    return useQuery({
        queryKey: ['users'],
        queryFn: () => apiService.getUsers()
    })
}