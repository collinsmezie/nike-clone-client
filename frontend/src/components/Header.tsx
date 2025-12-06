import { Link } from 'react-router';
// import { ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function Header() {
    const { cartCount } = useCart();

    return (
        <header className="sticky top-0 bg-white z-50">
            <div className="max-w-[1920px] mx-auto px-8 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/products" className="flex-shrink-0">
                        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="black">
                            <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.12 0-1.933-.392-2.437-1.177-.317-.504-.41-1.143-.28-1.918.13-.775.476-1.6 1.04-2.478.563-.878 1.41-1.932 2.54-3.161 1.13-1.229 2.66-2.631 4.59-4.208L24 7.8z" />
                        </svg>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
                        <Link to="/products?category=men" className="text-sm font-medium hover:text-gray-600 transition">
                            Men
                        </Link>
                        <Link to="/products?category=women" className="text-sm font-medium hover:text-gray-600 transition">
                            Women
                        </Link>
                        <Link to="/products?category=kids" className="text-sm font-medium hover:text-gray-600 transition">
                            Kids
                        </Link>
                        <Link to="/products" className="text-sm font-medium hover:text-gray-600 transition">
                            Collections
                        </Link>
                        <Link to="/contact" className="text-sm font-medium hover:text-gray-600 transition">
                            Contact
                        </Link>
                    </nav>

                    {/* Right side - Search & Cart */}
                    <div className="flex items-center space-x-6">
                        <button className="text-sm font-medium hover:text-gray-600 transition hidden md:block">
                            Search
                        </button>
                        <Link to="/cart" className="flex items-center space-x-2 text-sm font-medium hover:text-gray-600 transition">
                            {/* <ShoppingBag className="w-5 h-5" /> */}
                            <span className="hidden sm:inline">My Cart ({cartCount})</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
