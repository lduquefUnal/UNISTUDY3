import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Layout } from '../components/layout/Layout';
import { MOCK_PLANS } from '../services/mockData';
import { PlanCard } from '../components/ui/PlanCard';

const Planes: React.FC = () => {
    return (
        <Layout>
            <SEOHead />
            <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                            Planes Flexibles para Todos
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Sin suscripciones atadas. Paga solo por el tiempo que necesitas.
                            Activación manual y soporte personalizado incluido.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {MOCK_PLANS.map((plan) => (
                            <PlanCard key={plan.id} plan={plan} />
                        ))}
                    </div>

                    {/* Guarantee Badge */}
                    <div className="mt-16 text-center">
                        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-100">
                            <span className="text-lg">🛡️</span> Garantía de satisfacción de 24 horas
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Planes;
