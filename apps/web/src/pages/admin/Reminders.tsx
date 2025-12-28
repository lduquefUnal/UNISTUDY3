import React, { useMemo, useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Bell, ExternalLink, CalendarClock, AlertCircle, Search } from 'lucide-react';
import { openWhatsApp } from '../../utils/whatsapp';
import { useClientStore } from '../../store/clients';
import type { OrderHistory } from '../../store/clients';
import {
    clearReminderOverride,
    getReminderOverrides,
    getReminderTemplate,
    saveReminderTemplate,
    setReminderOverride,
    type ReminderOverrides
} from '../../services/remindersStore';

export const AdminReminders: React.FC = () => {
    const { clients } = useClientStore();
    const [overrides, setOverrides] = useState<ReminderOverrides>({});
    const [template, setTemplate] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setOverrides(getReminderOverrides());
        setTemplate(getReminderTemplate());
    }, []);

    const normalizeDateInput = (value: string) => {
        const parsed = new Date(value);
        if (!Number.isNaN(parsed.getTime())) {
            return parsed.toISOString().split('T')[0];
        }
        return value.split('T')[0] || '';
    };

    const getLatestOrder = (history: OrderHistory[]) => {
        const validOrders = history.filter(order => order.status !== 'closed');
        if (validOrders.length === 0) return null;
        return validOrders.reduce((latest, current) => {
            const latestTime = new Date(latest.date).getTime();
            const currentTime = new Date(current.date).getTime();
            if (Number.isNaN(latestTime)) return current;
            if (Number.isNaN(currentTime)) return latest;
            return currentTime > latestTime ? current : latest;
        });
    };

    const reminders = useMemo(() => {
        const items: Array<{
            id: string;
            clientId: string;
            clientName: string;
            phone: string;
            plan: string;
            lastOrderDate: string;
            reminderDate: string;
            daysSincePurchase: number;
            sortTimestamp: number;
            status: OrderHistory['status'];
        }> = [];

        clients.forEach(client => {
            const lastOrder = getLatestOrder(client.history);
            if (!lastOrder) return;

            const lastOrderDate = normalizeDateInput(lastOrder.date);
            const overrideDate = overrides[client.id];
            const reminderDate = overrideDate || lastOrderDate;
            const purchaseTimestamp = new Date(lastOrderDate).getTime();
            const reminderTimestamp = new Date(reminderDate).getTime();
            const daysSincePurchase = Number.isNaN(purchaseTimestamp)
                ? 0
                : Math.floor((Date.now() - purchaseTimestamp) / (1000 * 60 * 60 * 24));

            items.push({
                id: `${client.id}-${lastOrder.id}`,
                clientId: client.id,
                clientName: client.name,
                phone: client.phone,
                plan: lastOrder.plan,
                lastOrderDate,
                reminderDate,
                daysSincePurchase,
                sortTimestamp: Number.isNaN(reminderTimestamp) ? purchaseTimestamp : reminderTimestamp,
                status: lastOrder.status
            });
        });

        return items.sort((a, b) => a.sortTimestamp - b.sortTimestamp);
    }, [clients, overrides]);

    const filteredReminders = reminders.filter(item => {
        const query = searchTerm.toLowerCase();
        return (
            item.clientName.toLowerCase().includes(query) ||
            item.phone.includes(query) ||
            item.plan.toLowerCase().includes(query)
        );
    });

    const sendReminder = (reminder: typeof filteredReminders[number]) => {
        const firstName = reminder.clientName.split(' ')[0] || reminder.clientName;
        const message = template
            .replace(/\{name\}/g, firstName)
            .replace(/\{plan\}/g, reminder.plan);

        openWhatsApp(`57${reminder.phone}`, message);
    };

    const handleTemplateChange = (value: string) => {
        setTemplate(value);
        saveReminderTemplate(value);
    };

    const handleReminderDateChange = (clientId: string, value: string) => {
        if (!value) {
            clearReminderOverride(clientId);
            setOverrides(prev => {
                const next = { ...prev };
                delete next[clientId];
                return next;
            });
            return;
        }
        setReminderOverride(clientId, value);
        setOverrides(prev => ({ ...prev, [clientId]: value }));
    };

    return (
        <AdminLayout>
            <div className="mb-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <Bell className="w-8 h-8 text-orange-500 bg-orange-100 p-1.5 rounded-lg" />
                            Cola de Recordatorios
                            <span className="text-base font-normal text-gray-500">({filteredReminders.length})</span>
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Ordenados del más antiguo al más nuevo según la fecha de recordatorio.
                        </p>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Buscar cliente, tel o plan"
                            className="pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Plantilla de mensaje WhatsApp
                    </label>
                    <textarea
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm h-24 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={template}
                        onChange={(event) => handleTemplateChange(event.target.value)}
                    />
                    <p className="text-xs text-gray-400 mt-2">
                        Usa {`{name}`} y {`{plan}`} para personalizar con el ultimo servicio.
                    </p>
                </div>
            </div>

            {filteredReminders.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay recordatorios pendientes</h3>
                    <p className="text-gray-500">Ajusta el filtro o registra una compra para crear recordatorios</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Cliente</th>
                                    <th className="px-6 py-4">Tipo de Servicio</th>
                                    <th className="px-6 py-4">Última Compra</th>
                                    <th className="px-6 py-4">Días desde Compra</th>
                                    <th className="px-6 py-4">Fecha Recordatorio</th>
                                    <th className="px-6 py-4 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredReminders.map(item => (
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
                                            {item.lastOrderDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.daysSincePurchase >= 30
                                                ? 'bg-red-100 text-red-700'
                                                : item.daysSincePurchase >= 25
                                                    ? 'bg-orange-100 text-orange-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {item.daysSincePurchase} días
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="date"
                                                className="border border-gray-200 rounded-lg px-2 py-1 text-sm"
                                                value={item.reminderDate}
                                                onChange={(event) => handleReminderDateChange(item.clientId, event.target.value)}
                                            />
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
