import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { ProductFilters } from '../types';

interface FilterSidebarProps {
    filters: ProductFilters;
    onFilterChange: (key: keyof ProductFilters, value: string | number | undefined) => void;
}

interface FilterSidebarProps {
    filters: ProductFilters;
    onFilterChange: (key: keyof ProductFilters, value: string | number | undefined) => void;
}

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
    const [sections, setSections] = useState<Record<string, boolean>>({
        gender: true,
        kids: true,
        price: true,
        sports: true,
    });

    const toggleSection = (sectionId: string) => {
        setSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
    };

    const quickFilters = ['Low Top', 'High Top', 'Skateboarding', 'Nike By You'];

    return (
        <div className="w-64 pr-8">
            {/* Quick Filters */}
            <div className="space-y-2 mb-8">
                {quickFilters.map(filter => (
                    <button
                        key={filter}
                        type="button"
                        className="block w-full text-left px-0 py-1 text-sm hover:text-gray-600 transition"
                        onClick={() => {
                            if (filter === 'Low Top' || filter === 'High Top') onFilterChange('shoeHeight', filter);
                            else if (filter === 'Skateboarding') onFilterChange('sport', filter);
                            else onFilterChange('category', filter);
                        }}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Gender Filter */}
            <div className="border-t pt-6 mb-6">
                <button
                    type="button"
                    onClick={() => toggleSection('gender')}
                    className="flex items-center justify-between w-full mb-4"
                >
                    <span className="font-medium">Gender</span>
                    {sections.gender ? (
                        <ChevronUp className="w-4 h-4" />
                    ) : (
                        <ChevronDown className="w-4 h-4" />
                    )}
                </button>

                {sections.gender && (
                    <div className="space-y-2">
                        {['Men', 'Women', 'Unisex'].map(gender => (
                            <label key={gender} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.gender === gender}
                                    className="w-4 h-4 rounded border-gray-300"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            onFilterChange('gender', gender);
                                        } else {
                                            onFilterChange('gender', undefined);
                                        }
                                    }}
                                />
                                <span className="text-sm">{gender}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Kids Filter */}
            <div className="border-t pt-6 mb-6">
                <button
                    type="button"
                    onClick={() => toggleSection('kids')}
                    className="flex items-center justify-between w-full mb-4"
                >
                    <span className="font-medium">Kids</span>
                    {sections.kids ? (
                        <ChevronUp className="w-4 h-4" />
                    ) : (
                        <ChevronDown className="w-4 h-4" />
                    )}
                </button>

                {sections.kids && (
                    <div className="space-y-2">
                        {['Boys', 'Girls'].map(kid => (
                            <label key={kid} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.gender === kid}
                                    className="w-4 h-4 rounded border-gray-300"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            // Assuming 'Boys' and 'Girls' are mapped to gender or category
                                            // Since we added gender: 'Boys'/'Girls' to schema (implied), let's use gender
                                            // But wait, schema comment said "Men, Women, Unisex, Boys, Girls"
                                            onFilterChange('gender', kid);
                                        } else {
                                            onFilterChange('gender', undefined);
                                        }
                                    }}
                                />
                                <span className="text-sm">{kid}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Shop By Price */}
            <div className="border-t pt-6 mb-6">
                <button
                    type="button"
                    onClick={() => toggleSection('price')}
                    className="flex items-center justify-between w-full mb-4"
                >
                    <span className="font-medium">Shop By Price</span>
                    {sections.price ? (
                        <ChevronUp className="w-4 h-4" />
                    ) : (
                        <ChevronDown className="w-4 h-4" />
                    )}
                </button>

                {sections.price && (
                    <div className="space-y-2">
                        {[
                            { label: '$25 - $50', min: 25, max: 50 },
                            { label: '$50 - $100', min: 50, max: 100 },
                            { label: '$100 - $150', min: 100, max: 150 },
                            { label: 'Over $150', min: 150, max: undefined },
                        ].map(range => (
                            <label key={range.label} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                                    className="w-4 h-4 rounded border-gray-300"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            onFilterChange('minPrice', range.min);
                                            onFilterChange('maxPrice', range.max);
                                        } else {
                                            onFilterChange('minPrice', undefined);
                                            onFilterChange('maxPrice', undefined);
                                        }
                                    }}
                                />
                                <span className="text-sm">{range.label}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Shoe Height - Dropdown */}
            <div className="border-t pt-6 mb-6">
                <button
                    type="button"
                    onClick={() => toggleSection('height')}
                    className="flex items-center justify-between w-full mb-4"
                >
                    <span className="font-medium">Shoe Height</span>
                    <ChevronDown className="w-4 h-4" />
                </button>
            </div>

            {/* Sports Filter */}
            <div className="border-t pt-6 mb-6">
                <button
                    type="button"
                    onClick={() => toggleSection('sports')}
                    className="flex items-center justify-between w-full mb-4"
                >
                    <span className="font-medium">Sports</span>
                    {sections.sports ? (
                        <ChevronUp className="w-4 h-4" />
                    ) : (
                        <ChevronDown className="w-4 h-4" />
                    )}
                </button>

                {sections.sports && (
                    <div className="space-y-2">
                        {['Lifestyle', 'Skateboarding', 'Dance'].map(sport => (
                            <label key={sport} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.sport === sport}
                                    className="w-4 h-4 rounded border-gray-300"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            onFilterChange('sport', sport);
                                        } else {
                                            onFilterChange('sport', undefined);
                                        }
                                    }}
                                />
                                <span className="text-sm">{sport}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
