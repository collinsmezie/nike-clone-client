import { MapPin } from 'lucide-react';
import { Link } from 'react-router';
// import NikeLogo from './NikeLogo';

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-8 pb-8 mt-auto">

            {/* Bottom Bar (Responsive) */}
            <div className="container mx-auto px-4 pt-6 pb-6">
                {/* <div className="mb-8">
                    <NikeLogo className="w-12 h-12 text-white" />
                </div> */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end text-xs">
                    {/* Left Side: Location & Copyright */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 md:mb-0 text-[#7e7e7e]">
                        <div className="flex items-center text-white gap-2">
                            <MapPin size={12} className="fill-current" />
                            <span className="font-bold">Croatia</span>
                        </div>
                        <span>© 2025 Nike, Inc. All Rights Reserved</span>
                    </div>

                    {/* Right Side: Legal Links */}
                    <div className="flex flex-wrap gap-4 md:gap-6 text-[#7e7e7e]">
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
