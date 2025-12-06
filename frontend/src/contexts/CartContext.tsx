import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    image: string;
    size: string;
    color: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, 'id'>) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    cartCount: number;
    isCartOpen: boolean;
    toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('nike-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart from local storage');
            }
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('nike-cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (newItem: Omit<CartItem, 'id'>) => {
        setItems(prev => {
            // Check if item already exists (same product, size, color)
            const existingItemIndex = prev.findIndex(
                item => item.productId === newItem.productId && item.size === newItem.size && item.color === newItem.color
            );

            if (existingItemIndex >= 0) {
                // Update quantity
                const newItems = [...prev];
                newItems[existingItemIndex].quantity += newItem.quantity;
                return newItems;
            } else {
                // Add new item
                return [...prev, { ...newItem, id: Math.random().toString(36).substring(7) }];
            }
        });
        setIsCartOpen(true); // Open cart when adding item
    };

    const removeFromCart = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    const toggleCart = () => {
        setIsCartOpen(prev => !prev);
    };

    const cartCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, cartCount, isCartOpen, toggleCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
