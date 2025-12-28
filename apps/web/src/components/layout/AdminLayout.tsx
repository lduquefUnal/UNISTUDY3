import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingBag, Settings, LogOut, MessageSquare, Bell, Search, X, Menu } from 'lucide-react';
import { authService } from '../../services/auth';
import { cn } from '../../lib/utils';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: ShoppingBag, label: 'Planes', path: '/admin/planes' },
        { icon: Users, label: 'CRM', path: '/admin/crm' },
        { icon: Bell, label: 'Recordatorios', path: '/admin/recordatorios' },
        { icon: MessageSquare, label: 'Blog', path: '/admin/blog' },
        { icon: Search, label: 'SEO & Metadata', path: '/admin/seo' }, // NEW
        { icon: Settings, label: 'Configuración', path: '/admin/config' },
    ];

    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between shadow-md z-50 sticky top-0">
                <span className="font-bold text-lg">Unistudy Admin</span>
                <button onClick={toggleMobileMenu} className="p-2 text-slate-300 hover:text-white">
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen md:flex md:flex-col",
                mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
            )}>
                <div className="p-6 hidden md:block">
                    <h1 className="text-xl font-bold text-blue-400">Unistudy Admin</h1>
                </div>

                <div className="p-6 md:hidden flex justify-between items-center border-b border-slate-800">
                    <h1 className="text-xl font-bold text-blue-400">Menú</h1>
                    <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400">✕</button>
                </div>

                <nav className="flex-1 px-4 space-y-1 py-4 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition",
                                isActive(item.path)
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800 mt-auto">
                    <button
                        onClick={authService.logout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-slate-800 w-full transition"
                    >
                        <LogOut className="w-5 h-5" />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-x-hidden w-full">
                {children}
            </main>
        </div>
    );
};
