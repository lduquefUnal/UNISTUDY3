import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import type { Plan } from '../services/mockData';
import { getPlanById } from '../services/plansStore';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

const Checkout: React.FC = () => {
    const { planId } = useParams<{ planId: string }>();
    const navigate = useNavigate();
    const [plan, setPlan] = useState<Plan | null>(null);

    useEffect(() => {
        let active = true;
        const loadPlan = async () => {
            const foundPlan = await getPlanById(planId);
            if (!active) return;
            if (!foundPlan) {
                navigate('/planes');
                return;
            }
            setPlan(foundPlan);
        };
        loadPlan();
        return () => {
            active = false;
        };
    }, [planId, navigate]);

    if (!plan) return null;

    return (
        <Layout>
            <div className="bg-gray-50 min-h-[calc(100vh-64px)] py-12">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
                        <p className="text-gray-600 mt-2">Estás a un paso de potenciar tu aprendizaje.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        {/* Order Summary */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 order-2 md:order-1">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <CheckCircle2 className="text-green-500" />
                                Resumen del Pedido
                            </h2>

                            <div className="flex items-start justify-between pb-6 border-b border-gray-100 mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                                    <span className="text-sm text-gray-500 capitalize">Ciclo {plan.period}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-gray-900">${plan.price.toLocaleString('es-CO')}</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-800 flex items-start gap-3">
                                <ShieldCheck className="w-5 h-5 shrink-0" />
                                <p>
                                    <strong>Garantía de Satisfacción:</strong> Si no estás feliz en las primeras 24 horas, te devolvemos el dinero.
                                </p>
                            </div>
                        </div>

                        {/* Checkout Form */}
                        <div className="order-1 md:order-2">
                            <CheckoutForm plan={plan} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Checkout;
