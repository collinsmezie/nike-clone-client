// TypeScript interfaces
export interface User {
    id: string;
    email: string;
    fullName: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    rating: number;
    reviewCount: number;
    style: string;
    badge?: string;
    isHighlyRated: boolean;
    images: ProductImage[];
    colors?: ProductColor[];
    sizes?: ProductSize[];
    details?: ProductDetail[];
    reviews?: Review[];
}

export interface ProductImage {
    id: string;
    url: string;
    isPrimary: boolean;
}

export interface ProductColor {
    id: string;
    name: string;
    hexCode: string;
    imageUrl: string;
}

export interface ProductSize {
    id: string;
    size: string;
    inStock: boolean;
}

export interface ProductDetail {
    id: string;
    key: string;
    value: string;
}

export interface Review {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    user: {
        fullName: string;
    };
}

export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    take: number;
}

export interface ProductFilters {
    category?: string;
    size?: string;
    color?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    gender?: string;
    sport?: string;
    shoeHeight?: string;
    skip?: number;
    take?: number;
}
