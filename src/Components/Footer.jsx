import Logo from "./Logo";

const Footer = () => {
    return (
        <footer className="relative bg-white/50 backdrop-blur-md border-t border-white/60 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <Logo />
                        <p className="mt-4 text-sm text-gray-500 max-w-xs">
                            Seamlessly organize your ideas and capture your thoughts with our
                            intuitive platform.
                        </p>
                        <div className="flex gap-4 mt-6">
                            {/* Social Icons Placeholders */}
                            <div className="w-8 h-8 rounded-full bg-gray-200/50 hover:bg-gray-300/50 transition-colors cursor-pointer"></div>
                            <div className="w-8 h-8 rounded-full bg-gray-200/50 hover:bg-gray-300/50 transition-colors cursor-pointer"></div>
                            <div className="w-8 h-8 rounded-full bg-gray-200/50 hover:bg-gray-300/50 transition-colors cursor-pointer"></div>
                        </div>
                    </div>
                    {/* Links Columns */}
                    

                     <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Product</h3>
                        <ul className="mt-4 space-y-3">
                            <li><a href="#features" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Features</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Integrations</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Changelog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
                        <ul className="mt-4 space-y-3">
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Documentation</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">API Reference</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Community</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Help Center</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-3">
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">About</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Blog</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Careers</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                </div>

<div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500">
                        &copy; 2026 NoteNest. All rights reserved.
                    </p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</a>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
