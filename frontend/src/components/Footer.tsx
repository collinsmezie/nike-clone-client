import { MapPin } from 'lucide-react';
import { Link } from 'react-router';

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-8 pb-8 mt-auto">
            {/* Desktop Footer Content */}
            <div className="hidden md:grid container mx-auto px-4 grid-cols-4 gap-8 mb-8 text-xs">
                <div className="flex flex-col space-y-4">
                    <h3 className="font-bold font-oswald uppercase tracking-wider">Find A Store</h3>
                    <h3 className="font-bold font-oswald uppercase tracking-wider">Become A Member</h3>
                    <h3 className="font-bold font-oswald uppercase tracking-wider">Sign Up for Email</h3>
                    <h3 className="font-bold font-oswald uppercase tracking-wider">Send Us Feedback</h3>
                    <h3 className="font-bold font-oswald uppercase tracking-wider">Student Discounts</h3>
                </div>

                <div className="flex flex-col space-y-3 text-gray-400">
                    <h3 className="font-bold text-white font-oswald uppercase tracking-wider mb-1">Get Help</h3>
                    <Link to="#" className="hover:text-white transition-colors">Order Status</Link>
                    <Link to="#" className="hover:text-white transition-colors">Delivery</Link>
                    <Link to="#" className="hover:text-white transition-colors">Returns</Link>
                    <Link to="#" className="hover:text-white transition-colors">Payment Options</Link>
                    <Link to="#" className="hover:text-white transition-colors">Contact Us</Link>
                </div>

                <div className="flex flex-col space-y-3 text-gray-400">
                    <h3 className="font-bold text-white font-oswald uppercase tracking-wider mb-1">About Nike</h3>
                    <Link to="#" className="hover:text-white transition-colors">News</Link>
                    <Link to="#" className="hover:text-white transition-colors">Careers</Link>
                    <Link to="#" className="hover:text-white transition-colors">Investors</Link>
                    <Link to="#" className="hover:text-white transition-colors">Sustainability</Link>
                </div>

                <div className="flex flex-col space-y-3 text-gray-400">
                    <h3 className="font-bold text-white font-oswald uppercase tracking-wider mb-1">Join Us</h3>
                    <Link to="#" className="hover:text-white transition-colors">Nike App</Link>
                    <Link to="#" className="hover:text-white transition-colors">Nike Run Club</Link>
                    <Link to="#" className="hover:text-white transition-colors">Nike Training Club</Link>
                    <Link to="#" className="hover:text-white transition-colors">SNKRS</Link>
                </div>
            </div>

            {/* Mobile Footer Content (Simplified) */}
            <div className="md:hidden container mx-auto px-4 mb-6">
                <div className="flex flex-col space-y-4">
                    <h3 className="font-bold font-oswald uppercase text-xs tracking-wider">Get Help</h3>
                    <h3 className="font-bold font-oswald uppercase text-xs tracking-wider">About Nike</h3>
                    <h3 className="font-bold font-oswald uppercase text-xs tracking-wider">Join Us</h3>
                </div>
            </div>

            {/* Bottom Bar (Responsive) */}
            <div className="container mx-auto px-4 border-t border-gray-800 pt-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-gray-400">
                    <div className="flex flex-col md:flex-row items-start md:items-center mb-4 md:mb-0 space-y-2 md:space-y-0 md:space-x-4">
                        <div className="flex items-center text-white">
                            <MapPin size={12} className="mr-2" />
                            <span className="font-bold">Croatia</span>
                        </div>
                        <span>© 2025 Nike, Inc. All Rights Reserved</span>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Link to="#" className="hover:text-white transition-colors">Guides</Link>
                        <Link to="#" className="hover:text-white transition-colors">Terms of Sale</Link>
                        <Link to="#" className="hover:text-white transition-colors">Terms of Use</Link>
                        <Link to="#" className="hover:text-white transition-colors">Nike Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
