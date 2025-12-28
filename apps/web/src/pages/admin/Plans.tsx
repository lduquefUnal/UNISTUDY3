import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import type { Plan } from '../../services/mockData';
import { getPlans, savePlans, PLANS_UPDATED_EVENT } from '../../services/plansStore';
import { Edit2, Plus, Save, Trash2, X } from 'lucide-react';

type PlanFormState = {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string;
    isRecommended: boolean;
    highlight: string;
    availableSpots: string;
};

const EMPTY_FORM: PlanFormState = {
    name: '',
    price: '',
    period: 'mes',
    description: '',
    features: '',
    isRecommended: false,
    highlight: '',
    availableSpots: ''
};

const planToForm = (plan: Plan): PlanFormState => ({
    name: plan.name,
    price: String(plan.price),
    period: plan.period,
    description: plan.description,
    features: plan.features.join('\n'),
    isRecommended: Boolean(plan.isRecommended),
    highlight: plan.highlight ?? '',
    availableSpots: plan.availableSpots ? String(plan.availableSpots) : ''
});

const formToPlan = (form: PlanFormState, existingId?: string): Plan => {
    const features = form.features
        .split('\n')
        .map(feature => feature.trim())
        .filter(Boolean);

    const priceValue = Number(form.price);
    const spotsValue = Number(form.availableSpots);

    return {
        id: existingId ?? crypto.randomUUID(),
        name: form.name.trim(),
        price: Number.isFinite(priceValue) ? priceValue : 0,
        period: form.period.trim(),
        description: form.description.trim(),
        features,
        isRecommended: form.isRecommended,
        highlight: form.highlight.trim() || undefined,
        availableSpots: form.availableSpots.trim()
            ? (Number.isFinite(spotsValue) ? spotsValue : undefined)
            : undefined
    };
};

const AdminPlans: React.FC = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formState, setFormState] = useState<PlanFormState>(EMPTY_FORM);

    useEffect(() => {
        const loadPlans = () => setPlans(getPlans());
        loadPlans();
        window.addEventListener(PLANS_UPDATED_EVENT, loadPlans);
        return () => window.removeEventListener(PLANS_UPDATED_EVENT, loadPlans);
    }, []);

    const startCreate = () => {
        setEditingId('new');
        setFormState(EMPTY_FORM);
    };

    const startEdit = (plan: Plan) => {
        setEditingId(plan.id);
        setFormState(planToForm(plan));
    };

    const cancelEdit = () => {
        setEditingId(null);
        setFormState(EMPTY_FORM);
    };

    const handleSave = (event: React.FormEvent) => {
        event.preventDefault();
        const plan = formToPlan(formState, editingId === 'new' ? undefined : editingId ?? undefined);
        const nextPlans = editingId && editingId !== 'new'
            ? plans.map(item => item.id === plan.id ? plan : item)
            : [plan, ...plans];
        setPlans(nextPlans);
        savePlans(nextPlans);
        cancelEdit();
    };

    const handleDelete = (planId: string) => {
        if (!window.confirm('¿Eliminar este plan? Esta acción no se puede deshacer.')) return;
        const nextPlans = plans.filter(plan => plan.id !== planId);
        setPlans(nextPlans);
        savePlans(nextPlans);
    };

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Planes</h1>
                <button
                    onClick={startCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-blue-700 transition"
                >
                    <Plus className="w-4 h-4" /> Nuevo Plan
                </button>
            </div>

            {editingId && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">
                            {editingId === 'new' ? 'Crear Plan' : 'Editar Plan'}
                        </h2>
                        <button
                            onClick={cancelEdit}
                            className="text-gray-500 hover:text-gray-700"
                            type="button"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formState.name}
                                    onChange={event => setFormState({ ...formState, name: event.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Precio (COP)</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formState.price}
                                    onChange={event => setFormState({ ...formState, price: event.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Periodo</label>
                                <input
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formState.period}
                                    onChange={event => setFormState({ ...formState, period: event.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cupos disponibles (opcional)</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formState.availableSpots}
                                    onChange={event => setFormState({ ...formState, availableSpots: event.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea
                                className="w-full border border-gray-300 rounded-lg p-2 h-24 focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formState.description}
                                onChange={event => setFormState({ ...formState, description: event.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Características (una por línea)</label>
                            <textarea
                                className="w-full border border-gray-300 rounded-lg p-2 h-28 focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formState.features}
                                onChange={event => setFormState({ ...formState, features: event.target.value })}
                                required
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    checked={formState.isRecommended}
                                    onChange={event => setFormState({ ...formState, isRecommended: event.target.checked })}
                                />
                                Plan destacado
                            </label>
                            {formState.isRecommended && (
                                <div className="flex-1 min-w-[220px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Etiqueta destacada</label>
                                    <input
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={formState.highlight}
                                        onChange={event => setFormState({ ...formState, highlight: event.target.value })}
                                        placeholder="Más Popular"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="px-4 py-2 text-gray-500 hover:text-gray-700"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
                            >
                                <Save className="w-4 h-4" />
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            )}

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
                            <button
                                onClick={() => startEdit(plan)}
                                className="flex-1 md:flex-none border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                            >
                                <Edit2 className="w-4 h-4" /> Editar
                            </button>
                            <button
                                onClick={() => handleDelete(plan.id)}
                                className="border border-red-200 text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition"
                            >
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
