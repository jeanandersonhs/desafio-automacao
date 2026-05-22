import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



export const queryClient = new queryClient();

export function ReactQueryProvider({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
        {children}
        </QueryClientProvider>
    );
    }