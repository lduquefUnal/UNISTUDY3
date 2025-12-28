import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { openWhatsApp } from '../../utils/whatsapp';
// import { BookOpen } from 'lucide-react'; // Removed as we use text gradient now

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100/50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 hover:opacity-80 transition">
                        {/* Use standard icons or remove specifically if causing issues, checking build next */}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Unistudy</span>
                    </Link>

                    <nav className="hidden md:flex gap-8 items-center">
                        <Link to="/planes" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Planes</Link>
                        <Link to="/blog" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Blog</Link>
                        <Link to="/faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Preguntas</Link>
                        <Link to="/soporte" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Soporte</Link>

                        <Link
                            to="/planes"
                            className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transform hover:-translate-y-0.5"
                        >
                            Ver Planes
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="flex-1">
                {children}
            </main>

            <footer className="border-t py-8 bg-gray-50">
                <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
                    <p className="text-gray-400">
                        Bogotá, Colombia<br />
                        <button onClick={() => openWhatsApp('573332260032')} className="hover:text-blue-600 transition text-left">
                            +57 333 226 0032
                        </button>
                        <br />
                        soporte@unistudy.co
                    </p>
                    <p className="mb-2">© {new Date().getFullYear()} Unistudy. Todos los derechos reservados.</p>
                    <Link to="/admin" className="text-gray-400 hover:text-gray-600 transition text-xs">Acceso Admin</Link>
                </div>
            </footer>

            {/* WhatsApp Floating Button */}
            <a
                href="https://wa.me/573000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-50 flex items-center justify-center"
                aria-label="Contactar por WhatsApp"
            >
                <MessageCircle className="w-6 h-6" />
            </a>
        </div>
    );
};
