import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { CheckCircle2, CircleDashed, Users } from 'lucide-react';
import { WhatsAppActions } from '../../components/admin/WhatsAppActions';

// CRM Mock Data (Updated)
const MOCK_DEALS = [
    { id: 1, name: 'Juan Pérez', plan: 'Profesional', status: 'PENDING_ACTIVATION', whatsapp: '3001234567', time: '10 min ago' },
    { id: 2, name: 'Maria Gomez', plan: 'Básico', status: 'PAID', whatsapp: '3109876543', time: '1 hour ago' },
    { id: 3, name: 'Carlos Ruiz', plan: 'Master', status: 'ACTIVATED', whatsapp: '3205551234', time: '1 day ago' },
];

const AdminCRM: React.FC = () => {
    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">CRM & Pipeline</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto pb-4">

                {/* Column: Pending Activation */}
                <div className="bg-gray-50 p-4 rounded-xl min-w-[300px]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                            <CircleDashed className="w-4 h-4 text-orange-500" />
                            Pendientes Activación
                        </h3>
                        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">{MOCK_DEALS.filter(d => d.status !== 'ACTIVATED').length}</span>
                    </div>
                    <div className="space-y-3">
                        {MOCK_DEALS.filter(d => ['PAID', 'PENDING_ACTIVATION'].includes(d.status)).map(deal => (
                            <DealCard key={deal.id} deal={deal} />
                        ))}
                    </div>
                </div>

                {/* Column: Activated */}
                <div className="bg-gray-50 p-4 rounded-xl min-w-[300px]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            Activados
                        </h3>
                        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">{MOCK_DEALS.filter(d => d.status === 'ACTIVATED').length}</span>
                    </div>
                    <div className="space-y-3">
                        {MOCK_DEALS.filter(d => d.status === 'ACTIVATED').map(deal => (
                            <DealCard key={deal.id} deal={deal} />
                        ))}
                    </div>
                </div>

                {/* Column: Contacts */}
                <div className="bg-gray-50 p-4 rounded-xl min-w-[300px]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-500" />
                            Todos los Contactos
                        </h3>
                    </div>
                    <div className="text-sm text-gray-500 text-center py-4 bg-white rounded-lg border border-gray-100">
                        Ver lista completa (Próximamente)
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
};

const DealCard = ({ deal }: any) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer group">
        <div className="flex justify-between items-start mb-2">
            <span className="font-semibold text-gray-900">{deal.name}</span>
            <span className="text-xs text-gray-400">{deal.time}</span>
        </div>
        <div className="text-sm text-gray-600 mb-3">{deal.plan}</div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
            <span className="text-xs font-mono text-gray-400">{deal.whatsapp}</span>
            <WhatsAppActions
                phone={deal.whatsapp}
                customerName={deal.name}
                planName={deal.plan}
            />
        </div>
    </div>
);

export default AdminCRM;
