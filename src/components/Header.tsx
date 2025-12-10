import { Link } from 'react-router';
import NikeLogo from './NikeLogo';
// import { ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
    const { cartCount } = useCart();
    const { isAuthenticated, logout } = useAuth();

    return (
        <header className="sticky top-0 bg-white z-50">
            <div className="max-w-[1920px] mx-auto px-8 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/products" className="flex-shrink-0">
                        <NikeLogo className="w-12 h-12 text-black" />
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
                        {isAuthenticated && (
                            <button
                                onClick={logout}
                                className="text-sm font-medium hover:text-gray-600 transition"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
