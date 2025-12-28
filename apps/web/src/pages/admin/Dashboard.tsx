import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Users, CreditCard, Activity, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Lun', pedidos: 4 },
    { name: 'Mar', pedidos: 3 },
    { name: 'Mie', pedidos: 7 },
    { name: 'Jue', pedidos: 5 },
    { name: 'Vie', pedidos: 8 },
    { name: 'Sab', pedidos: 12 },
    { name: 'Dom', pedidos: 10 },
];

const AdminDashboard: React.FC = () => {
    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Panel de Control</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard icon={Users} label="Clientes Activos" value="124" trend="+12%" />
                <StatsCard icon={CreditCard} label="Ventas del Mes" value="$4.2M" trend="+8%" color="text-green-600" />
                <StatsCard icon={Activity} label="Pedidos Pendientes" value="5" color="text-orange-600" />
                <StatsCard icon={TrendingUp} label="Tasa de Conversión" value="3.2%" trend="-1%" color="text-blue-600" />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-lg font-bold mb-6">Historial de Pedidos (Semana)</h2>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="pedidos" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.1} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold mb-4">Actividad Reciente</h2>
                <div className="text-gray-500 text-sm text-center py-8">
                    Aquí aparecerá el log de actividad (Coming Soon)
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
