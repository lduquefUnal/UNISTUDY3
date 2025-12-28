import React from 'react';
import type { Plan } from '../../services/mockData';
import { Check, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface PlanCardProps {
    plan: Plan;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
    return (
        <div className={cn(
            "relative group rounded-3xl p-8 transition-all duration-300",
            "border",
            plan.isRecommended
                ? "bg-white border-blue-500 shadow-xl shadow-blue-500/10 scale-105 z-10"
                : "bg-white border-gray-100 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1"
        )}>
            {plan.isRecommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 w-max">
                    <Star className="w-3 h-3 fill-current" /> {plan.highlight || 'Más Popular'}
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500 h-10">{plan.description}</p>
            </div>

            <div className="mb-6">
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-gray-900">
                        ${plan.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500 font-medium">/{plan.period}</span>
                </div>
            </div>

            <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                        <div className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                            plan.isRecommended ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                        )}>
                            <Check className="w-3 h-3" />
                        </div>
                        <span className="text-sm text-gray-600 leading-tight">{feature}</span>
                    </div>
                ))}
            </div>

            <Link
                to={`/checkout/${plan.id}`}
                className={cn(
                    "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition-all duration-300",
                    plan.isRecommended
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
                        : "bg-gray-50 text-gray-900 hover:bg-blue-50 hover:text-blue-700"
                )}
            >
                <Zap className="w-4 h-4" />
                Elegir Plan
            </Link>

            {plan.availableSpots && (
                <p className="mt-4 text-center text-xs font-medium text-orange-600 bg-orange-50 py-1 rounded-lg">
                    🔥 ¡Solo quedan {plan.availableSpots} cupos!
                </p>
            )}
        </div>
    );
};
