import { PrismaService } from '../prisma.service';
import { ProductFilterDto } from './dto/product-filter.dto';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(filterDto: ProductFilterDto): Promise<{
        products: ({
            images: {
                id: string;
                isPrimary: boolean;
                productId: string;
                url: string;
            }[];
            colors: {
                id: string;
                name: string;
                productId: string;
                hexCode: string | null;
                imageUrl: string;
            }[];
            sizes: {
                id: string;
                inStock: boolean;
                productId: string;
                size: string;
            }[];
        } & {
            id: string;
            name: string;
            category: string;
            price: number;
            description: string;
            rating: number;
            reviewCount: number;
            style: string;
            badge: string | null;
            gender: string | null;
            sport: string | null;
            shoeHeight: string | null;
            isHighlyRated: boolean;
            createdAt: Date;
            updatedAt: Date;
        })[];
        total: number;
        skip: number;
        take: number;
    }>;
    findOne(id: string): Promise<({
        images: {
            id: string;
            isPrimary: boolean;
            productId: string;
            url: string;
        }[];
        colors: {
            id: string;
            name: string;
            productId: string;
            hexCode: string | null;
            imageUrl: string;
        }[];
        sizes: {
            id: string;
            inStock: boolean;
            productId: string;
            size: string;
        }[];
        details: {
            id: string;
            productId: string;
            key: string;
            value: string;
        }[];
        reviews: ({
            user: {
                fullName: string;
            };
        } & {
            id: string;
            rating: number;
            createdAt: Date;
            productId: string;
            userId: string;
            comment: string;
        })[];
    } & {
        id: string;
        name: string;
        category: string;
        price: number;
        description: string;
        rating: number;
        reviewCount: number;
        style: string;
        badge: string | null;
        gender: string | null;
        sport: string | null;
        shoeHeight: string | null;
        isHighlyRated: boolean;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    getRecommendations(productId: string): Promise<({
        images: {
            id: string;
            isPrimary: boolean;
            productId: string;
            url: string;
        }[];
    } & {
        id: string;
        name: string;
        category: string;
        price: number;
        description: string;
        rating: number;
        reviewCount: number;
        style: string;
        badge: string | null;
        gender: string | null;
        sport: string | null;
        shoeHeight: string | null;
        isHighlyRated: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
