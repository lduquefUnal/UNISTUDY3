import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useClientStore } from '../../store/clients';

// Load orders from localStorage
const loadOrders = () => {
    const stored = localStorage.getItem('unistudy_mock_orders');
    return stored ? JSON.parse(stored) : [];
};

export const AdminDashboard: React.FC = () => {
    const { clients } = useClientStore();
    const [orders, setOrders] = useState<any[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        // Load orders
        const allOrders = loadOrders();
        setOrders(allOrders);

        // Generate chart data (last 7 days)
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            return date.toISOString().split('T')[0];
        });

        const chartData = last7Days.map(date => {
            const dayOrders = allOrders.filter((o: any) =>
                o.createdAt.split('T')[0] === date
            );
            return {
                date: new Date(date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
                pedidos: dayOrders.length,
                ingresos: dayOrders.reduce((sum: number, o: any) => sum + (o.amount || 0), 0) / 1000
            };
        });

        setChartData(chartData);
    }, []);

    // Calculate stats
    const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const activeOrders = orders.filter(o =>
        ['PAID', 'PENDING_ACTIVATION', 'ACTIVATED'].includes(o.status)
    ).length;
    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Panel de Control</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard icon={CreditCard} label="Ventas del Mes" value="$4.2M" trend="+8%" color="text-green-600" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatsCard
                        icon={Users}
                        label="Clientes Totales"
                        value={clients.length.toString()}
                        trend="+12% vs mes anterior"
                        color="text-blue-600"
                <StatsCard
                        icon={Users}
                        label="Clientes Totales"
                        value={clients.length.toString()}
                        trend="+12% vs mes anterior"
                        color="text-blue-600"
                    />
                    <StatsCard
                        icon={ShoppingBag}
                        label="Pedidos Activos"
                        value={activeOrders.toString()}
                        trend={`${orders.length} total`}
                        color="text-green-600"
                    />
                    <StatsCard
                        icon={DollarSign}
                        label="Ingresos Totales"
                        value={`$${(totalRevenue / 1000).toFixed(0)}k`}
                        trend="COP"
                        color="text-purple-600"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold mb-6">Historial de Pedidos (Semana)</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorPedidos" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
                                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        padding: '8px 12px'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="pedidos"
                                    stroke="#3b82f6"
                                    fillOpacity={1}
                                    fill="url(#colorPedidos)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold mb-4">Actividad Reciente</h2>
                        <div className="text-gray-500 text-sm text-center py-8">
                            Aquí aparecerá el log de actividad (Coming Soon)
                        </div>
                    </div>
                </div>
        </AdminLayout>
    );
};

const StatsCard = ({ icon: Icon, label, value, trend, color = "text-gray-900" }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg bg-gray-50 ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
            {trend && (
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {trend}
                </span>
            )}
        </div>
        <p className="text-gray-500 text-sm mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    </div>
);

export default AdminDashboard;
