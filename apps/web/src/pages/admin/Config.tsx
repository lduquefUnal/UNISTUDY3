import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Save, Phone, MessageSquare } from 'lucide-react';

export const AdminConfig: React.FC = () => {
    // Mock settings - in real app, fetch from backend/localStorage
    const [settings, setSettings] = useState({
        adminPhone: '573332260032',
        welcomeMessage: '¡Hola! Bienvenido a Unistudy. Aquí tienes tus accesos.',
        renewalMessage: 'Hola, tu plan vence pronto. ¿Deseas renovar?',
        businessHours: '8:00 AM - 6:00 PM'
    });

    const [saved, setSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Save to localStorage for demo persistence
        localStorage.setItem('unistudy_config', JSON.stringify(settings));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    // Load on mount
    useEffect(() => {
        const stored = localStorage.getItem('unistudy_config');
        if (stored) setSettings(JSON.parse(stored));
    }, []);

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Configuración del Negocio</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl">
                <form onSubmit={handleSave} className="space-y-6">

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                            <Phone className="w-5 h-5 text-blue-500" />
                            Contacto Principal
                        </h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Admin (Para recibir pagos)</label>
                            <input
                                name="adminPhone"
                                value={settings.adminPhone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                            />
                            <p className="text-xs text-gray-400 mt-1">Este número recibirá los comprobantes de pago.</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6 space-y-4">
                        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-green-500" />
                            Plantillas de Mensajes
                        </h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje de Bienvenida</label>
                            <textarea
                                name="welcomeMessage"
                                value={settings.welcomeMessage}
                                onChange={handleChange}
                                rows={2}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje de Renovación (+25 días)</label>
                            <textarea
                                name="renewalMessage"
                                value={settings.renewalMessage}
                                onChange={handleChange}
                                rows={2}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex items-center gap-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            Guardar Cambios
                        </button>
                        {saved && <span className="text-green-600 font-medium animate-fade-in">¡Guardado con éxito!</span>}
                    </div>

                </form>
            </div>
        </AdminLayout>
    );
};

export default AdminConfig;
