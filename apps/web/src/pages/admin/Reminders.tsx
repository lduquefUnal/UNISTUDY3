import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Bell, ExternalLink, CalendarClock } from 'lucide-react';
import { openWhatsApp } from '../../utils/whatsapp';

const MOCK_REMINDERS = [
    { id: 101, customerName: 'Luisa Fernanda', plan: 'Plan Imagen Pro', activationDate: '2025-11-20', phone: '3001234567', daysActive: 28 },
    { id: 102, customerName: 'Andres Lopez', plan: 'Plan Video Pro', activationDate: '2025-11-25', phone: '3109876543', daysActive: 23 }, // Not due yet technically but close
    { id: 103, customerName: 'Camila Torres', plan: 'Plan IA Avanzada', activationDate: '2025-11-01', phone: '3205551122', daysActive: 47 } // Overdue
];

export const AdminReminders: React.FC = () => {

    // In a real app, this would come from the Config context/store
    const RENEWAL_TEMPLATE = "Hola {name}, tu {plan} está por vencer. ¿Te gustaría renovarlo para no perder tus beneficios?";

    const sendReminder = (reminder: typeof MOCK_REMINDERS[0]) => {
        const message = RENEWAL_TEMPLATE
            .replace('{name}', reminder.customerName.split(' ')[0])
            .replace('{plan}', reminder.plan);

        openWhatsApp(`57${reminder.phone}`, message);
    };

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <Bell className="w-8 h-8 text-orange-500 bg-orange-100 p-1.5 rounded-lg" />
                    Cola de Recordatorios
                </h1>
                <p className="text-gray-500 mt-2">
                    Clientes cuyo plan ha estado activo por 25 días o más. Envía un mensaje para asegurar la renovación.
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Cliente</th>
                            <th className="px-6 py-4">Plan Activo</th>
                            <th className="px-6 py-4">Fecha Activación</th>
                            <th className="px-6 py-4">Días Activo</th>
                            <th className="px-6 py-4 text-right">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {MOCK_REMINDERS.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-900">{item.customerName}</td>
                                <td className="px-6 py-4 text-gray-600">{item.plan}</td>
                                <td className="px-6 py-4 text-gray-500 flex items-center gap-2">
                                    <CalendarClock className="w-4 h-4" />
                                    {item.activationDate}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.daysActive >= 25 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {item.daysActive} días
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => sendReminder(item)}
                                        className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700 flex items-center gap-2 ml-auto"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Enviar WhatsApp
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default AdminReminders;
