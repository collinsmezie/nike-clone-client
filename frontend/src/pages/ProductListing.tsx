import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Link, useSearchParams } from 'react-router';
import { Heart, SlidersHorizontal, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterSidebar from '../components/FilterSidebar';
import type { ProductFilters } from '../types';

export default function ProductListing() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [filters, setFilters] = useState<ProductFilters>(() => ({
        take: 100,
        category: searchParams.get('category') || undefined,
        gender: searchParams.get('gender') || undefined,
        minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
        maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
        sport: searchParams.get('sport') || undefined,
        shoeHeight: searchParams.get('shoeHeight') || undefined,
    }));

    const [showFilters, setShowFilters] = useState(true);
    const { data, isLoading, isError } = useProducts(filters);

    const handleFilterChange = (key: keyof ProductFilters, value: string | number | undefined) => {
        setFilters(prev => {
            const newFilters = { ...prev, [key]: value };

            // Update URL params
            const newParams = new URLSearchParams(searchParams);
            if (value !== undefined && value !== '') {
                newParams.set(key, String(value));
            } else {
                newParams.delete(key);
            }
            setSearchParams(newParams, { replace: true });

            return newFilters;
        });
    };

    // Function to get badge color class
    const getBadgeClass = (badge: string | null) => {
        if (!badge) return '';
        if (badge.toLowerCase().includes('best seller')) return 'text-red-600';
        if (badge.toLowerCase().includes('20%')) return 'text-green-600';
        if (badge.toLowerCase().includes('10%')) return 'text-green-600';
        if (badge.toLowerCase().includes('sustainable')) return 'text-green-700';
        return 'text-red-600';
    };

    // Function to generate nice placeholder image URL
    const getPlaceholderImage = (productName: string, badge?: string | null) => {
        // Use different background colors based on badge type
        let bgColor = 'f5f5f5'; // light gray default
        const textColor = '111111'; // black

        if (badge?.toLowerCase().includes('best seller')) {
            bgColor = 'fff5f5'; // light red
        } else if (badge?.toLowerCase().includes('20%')) {
            bgColor = 'f0fdf4'; // light green
        } else if (badge?.toLowerCase().includes('sustainable')) {
            bgColor = 'ecfdf5'; // light emerald
        }

        return `https://placehold.co/600x600/${bgColor}/${textColor}/png?text=${encodeURIComponent(productName.substring(0, 20))}`;
    };

    if (isLoading) return (
        <div className="min-h-screen">
            <Header />
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading products...</p>
                </div>
            </div>
        </div>
    );

    if (isError) return (
        <div className="min-h-screen">
            <Header />
            <div className="flex items-center justify-center h-96">
                <p className="text-red-600">Error loading products</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />

            <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-6 flex-1 w-full">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-6 sticky top-0 bg-white z-10 py-2">
                    <h1 className="text-xl md:text-2xl font-medium">New ({data?.total || 0})</h1>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="hidden md:flex items-center space-x-2 text-sm font-medium hover:text-gray-600 transition"
                        >
                            <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
                            <SlidersHorizontal className="w-4 h-4" />
                        </button>
                        <button className="flex items-center space-x-2 text-sm font-medium hover:text-gray-600 transition">
                            <span>Sort By</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Filters Sidebar - Desktop Only */}
                    {showFilters && (
                        <div className="hidden md:block w-64 flex-shrink-0">
                            <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
                        </div>
                    )}

                    {/* Products Grid */}
                    <div className="flex-1">
                        {data?.products.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <p className="text-lg font-medium mb-2">No results found</p>
                                <p className="text-gray-500">We couldn't find any products matching your filters.</p>
                                <button
                                    onClick={() => {
                                        setFilters({ take: 100 });
                                        setSearchParams({});
                                    }}
                                    className="mt-4 text-black underline hover:text-gray-600"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {data?.products.map(product => (
                                    <div key={product.id} className="group relative">
                                        <Link to={`/products/${product.id}`}>
                                            {/* Product Image */}
                                            <div className="aspect-square bg-gray-50 mb-3 overflow-hidden relative">
                                                <img
                                                    src={product.images[0]?.url || getPlaceholderImage(product.name, product.badge)}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />

                                                {/* Badge - Top Left inside image */}
                                                {product.badge && (
                                                    <div className={`absolute top-3 left-3 bg-white ${product.badge.toLowerCase() === 'highly rated' ? 'px-2 py-1 rounded shadow-sm' : 'px-3 py-1 rounded-full'} `}>
                                                        <p className={`text-xs font-medium whitespace-nowrap ${getBadgeClass(product.badge)}`}>
                                                            {product.badge}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Heart Icon */}
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        // Add to favorites logic here
                                                    }}
                                                    className="absolute top-3 right-3 p-1.5 md:p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform opacity-0 group-hover:opacity-100"
                                                >
                                                    <Heart className="w-4 h-4 md:w-5 md:h-5" />
                                                </button>
                                            </div>

                                            {/* Product Info */}
                                            <div>
                                                {/* Row 1: Name and Price */}
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="font-medium text-base pr-2">{product.name}</h3>
                                                    <p className="font-medium text-base">${product.price.toFixed(2)}</p>
                                                </div>

                                                {/* Row 2: Category */}
                                                <p className="text-sm text-gray-500 mb-1">{product.category}</p>

                                                {/* Row 3: Color Count */}
                                                {product.colors && product.colors.length > 0 && (
                                                    <p className="text-sm text-gray-500">
                                                        {product.colors.length} Colour{product.colors.length > 1 ? 's' : ''}
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
