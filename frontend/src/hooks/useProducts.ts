import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import type { Product, ProductsResponse, ProductFilters } from '../types';

export function useProducts(filters: ProductFilters = {}) {
    return useQuery({
        queryKey: ['products', filters],
        queryFn: async () => {
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== '') {
                    params.append(key, String(value));
                }
            });
            const response = await api.get<ProductsResponse>(`/products?${params.toString()}`);
            return response.data;
        },
    });
}

export function useProduct(id: string | undefined) {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            if (!id) throw new Error('Product ID is required');
            const response = await api.get<Product>(`/products/${id}`);
            return response.data;
        },
        enabled: !!id,
    });
}

export function useRecommendations(id: string | undefined) {
    return useQuery({
        queryKey: ['recommendations', id],
        queryFn: async () => {
            if (!id) throw new Error('Product ID is required');
            const response = await api.get<Product[]>(`/products/${id}/recommendations`);
            return response.data;
        },
        enabled: !!id,
    });
}
