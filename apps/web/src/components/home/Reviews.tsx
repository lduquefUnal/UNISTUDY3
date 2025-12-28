
import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

const reviews = [
    {
        name: 'Maria Fernanda',
        role: 'Estudiante de Derecho',
        text: 'Unistudy me ha salvado la vida. Las herramientas premium son esenciales para mi carrera y el precio es increíble.',
        rating: 5
    },
    {
        name: 'Carlos Andrés',
        role: 'Diseñador Gráfico',
        text: 'La cuenta de Adobe funciona perfecto. El ahorro es gigante y el soporte por WhatsApp es súper rápido.',
        rating: 5
    },
    {
        name: 'Laura Sofia',
        role: 'Estudiante de Medicina',
        text: 'Llevo 6 meses usando el plan anual y nunca he tenido problemas. 100% recomendado para universitarios.',
        rating: 5
    }
];

export const Reviews: React.FC = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-100/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                        Lo que dicen nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Estudiantes</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Únete a miles de estudiantes que ya están ahorrando y mejorando su carrera con Unistudy.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 hover:-translate-y-1 transition duration-300">
                            <div className="flex gap-1 mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            <Quote className="w-10 h-10 text-blue-100 mb-4" />
                            <p className="text-gray-700 leading-relaxed mb-6">
                                "{review.text}"
                            </p>
                            <div className="flex items-center gap-4 border-t border-gray-100 pt-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                                    <p className="text-xs text-blue-600 font-medium">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium text-sm">
                        <CheckCircle className="w-4 h-4" />
                        +1,500 Clientes Satisfechos
                    </div>
                </div>
            </div>
        </section>
    );
};
