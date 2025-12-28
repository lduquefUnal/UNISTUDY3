import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Bell, ExternalLink, CalendarClock, Trash2, AlertCircle } from 'lucide-react';
import { openWhatsApp } from '../../utils/whatsapp';
import { useClientStore } from '../../store/clients';
import type { OrderHistory } from '../../store/clients';

export const AdminReminders: React.FC = () => {
    const { clients } = useClientStore();
    const [reminders, setReminders] = useState<any[]>([]);

    // Calculate reminders automatically from client orders
    useEffect(() => {
        const calculateReminders = () => {
            const allReminders: any[] = [];

            clients.forEach(client => {
                client.history.forEach((order: OrderHistory) => {
                    if (order.status === 'active') {
                        const activationDate = new Date(order.date);
                        const today = new Date();
                        const daysActive = Math.floor((today.getTime() - activationDate.getTime()) / (1000 * 60 * 60 * 24));

                        // Only show if >= 25 days (close to 30-day renewal)
                        if (daysActive >= 25) {
                            allReminders.push({
                                id: order.id,
                                clientName: client.name,
                                phone: client.phone,
                                plan: order.plan,
                                activationDate: activationDate.toISOString().split('T')[0],
                                daysActive,
                                orderRef: order.id
                            });
                        }
                    }
                });
            });

            // Sort by daysActive (oldest first)
            allReminders.sort((a, b) => b.daysActive - a.daysActive);
            setReminders(allReminders);
        };

        calculateReminders();
    }, [clients]);

    const RENEWAL_TEMPLATE = "Hola {name}, tu {plan} está por vencer. ¿Te gustaría renovarlo para no perder tus beneficios?";

    const sendReminder = (reminder: any) => {
        const firstName = reminder.clientName.split(' ')[0];
        const message = RENEWAL_TEMPLATE
            .replace('{name}', firstName)
            .replace('{plan}', reminder.plan);

        openWhatsApp(`57${reminder.phone} `, message);
    };

    const deleteReminder = (reminderId: string) => {
        if (confirm('¿Eliminar este recordatorio? (No afecta la orden original)')) {
            setReminders(prev => prev.filter(r => r.id !== reminderId));
        }
    };

    return (
        <AdminLayout>
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <Bell className="w-8 h-8 text-orange-500 bg-orange-100 p-1.5 rounded-lg" />
                            Cola de Recordatorios
                            <span className="text-base font-normal text-gray-500">({reminders.length})</span>
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Clientes con servicios activos por ≥25 días. Ordenados del más viejo al más nuevo.
                        </p>
                    </div>
                </div>
            </div>

            {reminders.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay recordatorios pendientes</h3>
                    <p className="text-gray-500">Los clientes aparecerán aquí cuando sus servicios tengan 25+ días activos</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Cliente</th>
                                    <th className="px-6 py-4">Tipo de Servicio</th>
                                    <th className="px-6 py-4">Fecha Activación</th>
                                    <th className="px-6 py-4">Días Activo</th>
                                    <th className="px-6 py-4 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {reminders.map(item => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{item.clientName}</div>
                                            <div className="text-xs text-gray-400">{item.phone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {item.plan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 flex items-center gap-2">
                                            <CalendarClock className="w-4 h-4" />
                                            {item.activationDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px - 2 py - 1 rounded - full text - xs font - bold ${item.daysActive >= 30
                                                ? 'bg-red-100 text-red-700'
                                                : item.daysActive >= 25
                                                    ? 'bg-orange-100 text-orange-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                } `}>
                                                {item.daysActive} días
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => sendReminder(item)}
                                                    className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700 flex items-center gap-2"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    Enviar
                                                </button>
                                                <button
                                                    onClick={() => deleteReminder(item.id)}
                                                    className="bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-200 flex items-center gap-2"
                                                    title="Eliminar recordatorio"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminReminders;
