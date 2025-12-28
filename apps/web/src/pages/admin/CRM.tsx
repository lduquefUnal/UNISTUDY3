import React, { useMemo } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { CheckCircle2, CircleDashed, Users } from 'lucide-react';
import { WhatsAppActions } from '../../components/admin/WhatsAppActions';
import { useClientStore } from '../../store/clients';
import type { OrderHistory, Client } from '../../store/clients';
import { Link } from 'react-router-dom';

type Deal = {
    id: string;
    clientId: string;
    orderId: string;
    name: string;
    plan: string;
    status: OrderHistory['status'];
    whatsapp: string;
    time: string;
    timestamp: number;
};

const formatRelativeTime = (date: string) => {
    const timestamp = new Date(date).getTime();
    if (Number.isNaN(timestamp)) return 'fecha desconocida';
    const diffMs = Date.now() - timestamp;
    const minutes = Math.floor(diffMs / (1000 * 60));
    if (minutes < 1) return 'hace segundos';
    if (minutes < 60) return `hace ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `hace ${hours} h`;
    const days = Math.floor(hours / 24);
    return `hace ${days} d`;
};

const AdminCRM: React.FC = () => {
    const { clients, updateOrderStatus } = useClientStore();

    const deals = useMemo<Deal[]>(() => (
        clients.flatMap(client => (
            client.history.map(order => {
                const parsedTime = new Date(order.date).getTime();
                return {
                    id: `${client.id}-${order.id}`,
                    clientId: client.phone,
                    orderId: order.id,
                    name: client.name,
                    plan: order.plan,
                    status: order.status,
                    whatsapp: client.phone,
                    time: formatRelativeTime(order.date),
                    timestamp: Number.isNaN(parsedTime) ? 0 : parsedTime
                };
            })
        ))
    ).sort((a, b) => b.timestamp - a.timestamp), [clients]);

    const visibleDeals = deals.filter(deal => deal.status !== 'closed');
    const pendingDeals = visibleDeals.filter(deal => deal.status !== 'active');
    const activeDeals = visibleDeals.filter(deal => deal.status === 'active');

    const sortedContacts = useMemo<Client[]>(() => (
        [...clients].sort((a, b) => {
            const timeA = new Date(a.createdAt).getTime();
            const timeB = new Date(b.createdAt).getTime();
            return (Number.isNaN(timeB) ? 0 : timeB) - (Number.isNaN(timeA) ? 0 : timeA);
        })
    ), [clients]);

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
                        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">{pendingDeals.length}</span>
                    </div>
                    <div className="space-y-3">
                        {pendingDeals.length === 0 ? (
                            <div className="text-sm text-gray-500 text-center py-4 bg-white rounded-lg border border-gray-100">
                                No hay pendientes por ahora
                            </div>
                        ) : (
                            pendingDeals.map(deal => (
                                <DealCard
                                    key={deal.id}
                                    deal={deal}
                                    onActivate={() => updateOrderStatus(deal.clientId, deal.orderId, 'active')}
                                    onClose={() => updateOrderStatus(deal.clientId, deal.orderId, 'closed')}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Column: Activated */}
                <div className="bg-gray-50 p-4 rounded-xl min-w-[300px]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            Activados
                        </h3>
                        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">{activeDeals.length}</span>
                    </div>
                    <div className="space-y-3">
                        {activeDeals.length === 0 ? (
                            <div className="text-sm text-gray-500 text-center py-4 bg-white rounded-lg border border-gray-100">
                                No hay activaciones registradas
                            </div>
                        ) : (
                            activeDeals.map(deal => (
                                <DealCard
                                    key={deal.id}
                                    deal={deal}
                                    onActivate={() => updateOrderStatus(deal.clientId, deal.orderId, 'active')}
                                    onClose={() => updateOrderStatus(deal.clientId, deal.orderId, 'closed')}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Column: Contacts */}
                <div className="bg-gray-50 p-4 rounded-xl min-w-[300px]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-500" />
                            Todos los Contactos
                        </h3>
                        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">{clients.length}</span>
                    </div>
                    <div className="space-y-3">
                        {sortedContacts.length === 0 ? (
                            <div className="text-sm text-gray-500 text-center py-4 bg-white rounded-lg border border-gray-100">
                                Aun no hay contactos
                            </div>
                        ) : (
                            <>
                                {sortedContacts.slice(0, 5).map(client => (
                                    <div key={client.id} className="bg-white p-3 rounded-lg border border-gray-100">
                                        <div className="text-sm font-semibold text-gray-900">{client.name}</div>
                                        <div className="text-xs text-gray-400">{client.phone}</div>
                                    </div>
                                ))}
                                <Link
                                    to="/admin/clients"
                                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                                >
                                    Ver lista completa
                                </Link>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
};

const statusStyles: Record<OrderHistory['status'], string> = {
    pending: 'bg-orange-100 text-orange-700',
    active: 'bg-green-100 text-green-700',
    expired: 'bg-gray-200 text-gray-600',
    closed: 'bg-slate-200 text-slate-500'
};

const statusLabels: Record<OrderHistory['status'], string> = {
    pending: 'Pendiente',
    active: 'Activo',
    expired: 'Expirado',
    closed: 'Cerrado'
};

const DealCard = ({
    deal,
    onActivate,
    onClose
}: {
    deal: Deal;
    onActivate: () => void;
    onClose: () => void;
}) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer group">
        <div className="flex justify-between items-start mb-2">
            <span className="font-semibold text-gray-900">{deal.name}</span>
            <span className="text-xs text-gray-400">{deal.time}</span>
        </div>
        <div className="text-sm text-gray-600 mb-3">{deal.plan}</div>
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold mb-3 ${statusStyles[deal.status]}`}>
            {statusLabels[deal.status]}
        </span>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
            <span className="text-xs font-mono text-gray-400">{deal.whatsapp}</span>
            <div className="flex items-center gap-3">
                {deal.status !== 'active' && (
                    <button
                        onClick={onActivate}
                        className="text-xs text-green-600 hover:text-green-700 font-semibold"
                    >
                        Activar
                    </button>
                )}
                <button
                    onClick={onClose}
                    className="text-xs text-gray-400 hover:text-gray-600 font-semibold"
                >
                    Cerrar
                </button>
                <WhatsAppActions
                    phone={deal.whatsapp}
                    customerName={deal.name}
                    planName={deal.plan}
                />
            </div>
        </div>
    </div>
);

export default AdminCRM;
