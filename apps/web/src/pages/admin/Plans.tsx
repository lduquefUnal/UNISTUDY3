import React, { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { MOCK_PLANS, type Plan } from '../../services/mockData';
import { Edit2, Plus, Trash2 } from 'lucide-react';

const AdminPlans: React.FC = () => {
    // Local state to simulate CRUD
    const [plans] = useState<Plan[]>(MOCK_PLANS);

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Planes</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-blue-700 transition">
                    <Plus className="w-4 h-4" /> Nuevo Plan
                </button>
            </div>

            <div className="grid gap-6">
                {plans.map(plan => (
                    <div key={plan.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-lg text-gray-900">{plan.name}</h3>
                                {plan.isRecommended && (
                                    <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-semibold">Destacado</span>
                                )}
                            </div>
                            <p className="text-gray-500 text-sm mb-2">{plan.description}</p>
                            <p className="font-mono text-sm font-semibold">${plan.price.toLocaleString()} / {plan.period}</p>
                        </div>

                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <button className="flex-1 md:flex-none border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
                                <Edit2 className="w-4 h-4" /> Editar
                            </button>
                            <button className="border border-red-200 text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
};

export default AdminPlans;
