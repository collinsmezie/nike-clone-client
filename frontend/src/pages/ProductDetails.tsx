import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { useProduct, useRecommendations } from '../hooks/useProducts';
import { ChevronLeft, ChevronRight, Star, ChevronDown, ChevronUp, Heart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const { data: product, isLoading } = useProduct(id);
    const { data: recommendations } = useRecommendations(id);

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const [expandedSections, setExpandedSections] = useState({
        details: true,
        shipping: false,
        reviews: false,
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const getPlaceholderImage = (productName: string, index: number = 0) => {
        const colors = ['f5f5f5', 'fff5f5', 'f0fdf4', 'fef2f2', 'f0f9ff'];
        const bgColor = colors[index % colors.length];
        return `https://placehold.co/600x600/${bgColor}/111111/png?text=${encodeURIComponent(productName.substring(0, 15))}`;
    };

    const nextImage = () => {
        if (product && product.images.length > 0) {
            setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
        }
    };

    const prevImage = () => {
        if (product && product.images.length > 0) {
            setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
        }
    };

    const { addToCart } = useCart();

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }
        if (!product) return;

        addToCart({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0]?.url || '',
            size: selectedSize,
            color: product.colors?.[selectedColorIndex]?.name || 'Default',
            quantity: 1,
        });
        alert('Added to bag!');
    };

    if (isLoading) return (
        <div className="min-h-screen">
            <Header />
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading product...</p>
                </div>
            </div>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen">
            <Header />
            <div className="flex items-center justify-center h-96">
                <p className="text-red-600">Product not found</p>
            </div>
        </div>
    );

    const currentImage = product.images[selectedImageIndex]?.url || getPlaceholderImage(product.name, selectedImageIndex);

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 py-8">
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
                    {/* Left - Thumbnail Gallery (Desktop) */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="space-y-3">
                            {product.images.length > 0 ? (
                                product.images.map((img, idx) => (
                                    <button
                                        key={img.id}
                                        onClick={() => setSelectedImageIndex(idx)}
                                        className={`w-full aspect-square border-2 rounded overflow-hidden ${selectedImageIndex === idx ? 'border-black' : 'border-gray-200'
                                            }`}
                                    >
                                        <img
                                            src={img.url || getPlaceholderImage(product.name, idx)}
                                            alt={`${product.name} ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))
                            ) : (
                                // Generate 8 placeholder thumbnails
                                Array.from({ length: 8 }).map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImageIndex(idx)}
                                        className={`w-full aspect-square border-2 rounded overflow-hidden ${selectedImageIndex === idx ? 'border-black' : 'border-gray-200'
                                            }`}
                                    >
                                        <img
                                            src={getPlaceholderImage(product.name, idx)}
                                            alt={`${product.name} ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Center - Main Image */}
                    <div className="lg:col-span-6">
                        <div className="relative bg-gray-50 rounded-lg overflow-hidden group">
                            {/* Highly Rated Badge Overlay */}
                            {product.isHighlyRated && (
                                <div className="absolute top-6 left-6 z-10 bg-white rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
                                    <Star className="w-4 h-4 fill-black text-black" />
                                    <span className="font-semibold text-sm">Highly Rated</span>
                                </div>
                            )}

                            <div className="aspect-square">
                                <img
                                    src={currentImage}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Mobile Thumbnails (Below Main Image) */}
                            <div className="flex lg:hidden gap-2 mt-4 overflow-x-auto pb-2">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={img.id}
                                        onClick={() => setSelectedImageIndex(idx)}
                                        className={`flex-shrink-0 w-16 h-16 border-2 rounded overflow-hidden ${selectedImageIndex === idx ? 'border-black' : 'border-gray-200'
                                            }`}
                                    >
                                        <img
                                            src={img.url || getPlaceholderImage(product.name, idx)}
                                            alt={`${product.name} ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Right - Product Info */}
                    <div className="lg:col-span-5">


                        {/* Product Name & Category */}
                        <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
                        <p className="text-gray-600 mb-4">{product.category}</p>

                        {/* Price */}
                        <p className="text-2xl font-medium mb-2">${product.price.toFixed(2)}</p>

                        {/* Badge/Promotion */}
                        {product.badge && (
                            <p className="text-green-600 font-semibold mb-6">{product.badge}</p>
                        )}

                        {/* Color Selector */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="mb-6">
                                <div className="flex gap-2 flex-wrap">
                                    {product.colors.map((color, idx) => (
                                        <button
                                            key={color.id}
                                            onClick={() => setSelectedColorIndex(idx)}
                                            className={`w-16 h-16 border-2 rounded overflow-hidden ${selectedColorIndex === idx ? 'border-black' : 'border-gray-200'
                                                }`}
                                            title={color.name}
                                        >
                                            <img
                                                src={color.imageUrl}
                                                alt={color.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size Selector */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-medium">Select Size</h3>
                                <button className="text-sm text-gray-600 underline">Size Guide</button>
                            </div>

                            <div className="grid grid-cols-4 gap-2">
                                {product.sizes?.map(size => (
                                    <button
                                        key={size.id}
                                        onClick={() => size.inStock && setSelectedSize(size.size)}
                                        disabled={!size.inStock}
                                        className={`py-3 border rounded text-sm font-medium ${selectedSize === size.size
                                            ? 'border-black bg-black text-white'
                                            : size.inStock
                                                ? 'border-gray-300 hover:border-black'
                                                : 'border-gray-200 text-gray-300 cursor-not-allowed'
                                            }`}
                                    >
                                        {size.size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4 pt-6">
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-black text-white py-4 rounded-full hover:bg-gray-800 transition font-medium"
                            >
                                Add to Bag
                            </button>
                            <button className="w-full bg-white text-black border border-gray-300 py-4 rounded-full hover:border-black transition font-medium flex items-center justify-center space-x-2">
                                <Heart className="w-5 h-5" />
                                <span>Favorite</span>
                            </button>
                        </div>
                        {/* Product Details - Collapsible */}
                        <div className="mt-8 pt-6">
                            <button
                                onClick={() => toggleSection('details')}
                                className="flex items-center justify-between w-full mb-4"
                            >
                                <span className="font-medium text-lg">Product Details</span>
                                {expandedSections.details ? (
                                    <ChevronUp className="w-5 h-5" />
                                ) : (
                                    <ChevronDown className="w-5 h-5" />
                                )}
                            </button>

                            {expandedSections.details && (
                                <div className="text-gray-700 space-y-3">
                                    <p>{product.description}</p>
                                    {product.details && product.details.length > 0 && (
                                        <ul className="list-disc list-inside space-y-1">
                                            {product.details.map(detail => (
                                                <li key={detail.id}>{detail.value}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Shipping & Returns - Collapsible */}
                        <div className="pt-6">
                            <button
                                onClick={() => toggleSection('shipping')}
                                className="flex items-center justify-between w-full mb-4"
                            >
                                <span className="font-medium text-lg">Shipping & Returns</span>
                                {expandedSections.shipping ? (
                                    <ChevronUp className="w-5 h-5" />
                                ) : (
                                    <ChevronDown className="w-5 h-5" />
                                )}
                            </button>

                            {expandedSections.shipping && (
                                <div className="text-gray-700 space-y-3">
                                    <p>Free standard shipping on orders over $50.</p>
                                    <p>Free returns within 60 days of purchase.</p>
                                </div>
                            )}
                        </div>

                        {/* Reviews - Collapsible */}
                        <div className="pt-6">
                            <button
                                onClick={() => toggleSection('reviews')}
                                className="flex items-center justify-between w-full mb-4"
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="font-medium text-lg">Reviews ({product.reviewCount})</span>
                                    <div className="flex items-center">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                {expandedSections.reviews ? (
                                    <ChevronUp className="w-5 h-5" />
                                ) : (
                                    <ChevronDown className="w-5 h-5" />
                                )}
                            </button>

                            {expandedSections.reviews && product.reviews && product.reviews.length > 0 && (
                                <div className="space-y-4">
                                    {product.reviews.map(review => (
                                        <div key={review.id} className="pb-4">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <div className="flex">
                                                    {Array.from({ length: review.rating }).map((_, i) => (
                                                        <Star key={i} className="w-4 h-4 fill-current" />
                                                    ))}
                                                </div>
                                                <span className="font-semibold text-sm">{review.user.fullName}</span>
                                            </div>
                                            <p className="text-gray-700 text-sm">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* You Might Also Like */}
                {recommendations && recommendations.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-medium mb-8">You Might Also Like</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {recommendations.slice(0, 3).map(rec => (
                                <Link key={rec.id} to={`/products/${rec.id}`} className="group">
                                    <div className="aspect-square bg-gray-50 mb-3 rounded overflow-hidden relative">
                                        <img
                                            src={rec.images[0]?.url || getPlaceholderImage(rec.name, 0)}
                                            alt={rec.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {/* Badge */}
                                        {rec.badge && (
                                            <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded shadow-sm">
                                                <p className={`text-xs font-medium ${rec.badge.toLowerCase().includes('best seller') ? 'text-orange-600' :
                                                    rec.badge.toLowerCase().includes('20%') ? 'text-green-600' :
                                                        rec.badge.toLowerCase().includes('10%') ? 'text-green-600' :
                                                            'text-orange-600'
                                                    }`}>
                                                    {rec.badge}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-medium text-base pr-2">{rec.name}</h3>
                                            <p className="font-medium text-base">${rec.price.toFixed(2)}</p>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-1">{rec.category}</p>
                                        {rec.colors && rec.colors.length > 0 && (
                                            <p className="text-sm text-gray-500">
                                                {rec.colors.length} Colour{rec.colors.length > 1 ? 's' : ''}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
