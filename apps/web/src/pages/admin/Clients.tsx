
import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { useClientStore } from '../../store/clients';
import type { Client } from '../../store/clients';
import { Search, MessageCircle, Phone, Mail, Calendar } from 'lucide-react';
import { openWhatsApp } from '../../utils/whatsapp';

export const Clients: React.FC = () => {
    const { clients, refresh } = useClientStore();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        refresh();
    }, [refresh]);

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm) ||
        client.email.includes(searchTerm)
    );

    const handleWhatsApp = (client: Client) => {
        const firstName = client.name.split(' ')[0];
        const message = `Hola ${firstName}, te escribimos de Unistudy.`;
        openWhatsApp(`57${client.phone}`, message);
    };

    return (
        <AdminLayout>
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Clientes ({clients.length})</h1>
                    <p className="text-gray-500">Gestión de base de datos de clientes y pedidos</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, tel..."
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 font-medium text-gray-500 text-sm">Cliente</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-sm">Contacto</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-sm">Pedidos</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-sm">Registro</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-sm text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredClients.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                        No se encontraron clientes
                                    </td>
                                </tr>
                            ) : (
                                filteredClients.map((client) => (
                                    <tr key={client.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{client.name}</div>
                                            <div className="text-xs text-gray-400">ID: {client.id}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1 text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-3 h-3" /> {client.phone}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Mail className="w-3 h-3" /> {client.email || 'No email'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {client.history.length} Pedidos
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(client.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleWhatsApp(client)}
                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                                title="Enviar WhatsApp"
                                            >
                                                <MessageCircle className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};
export default Clients;
