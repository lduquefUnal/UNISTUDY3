import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Plan } from '../../services/mockData';
import { createOrder } from '../../services/mockOrders';
import { Lock, MessageCircle, User, Mail, Phone, Copy, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { openWhatsApp } from '../../utils/whatsapp';
import { useClientStore } from '../../store/clients';
import { createClient } from '../../services/clientsService';

interface CheckoutFormProps {
    plan: Plan;
    billingPeriod?: 'mensual' | 'anual';
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ plan }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Datos, 2: Pago

    const { refresh } = useClientStore();

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [copied, setCopied] = useState('');

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(''), 2000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (step === 1) {
            setStep(2);
            return;
        }

        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleManualConfirmation = async () => {
        setLoading(true);
        try {
            const fullName = `${formData.firstName} ${formData.lastName}`;
            const cleanPhone = formData.phone.replace(/\D/g, '');

            await createClient({
                phone: cleanPhone,
                name: fullName,
                email: formData.email || undefined,
                notes: undefined
            });

            const order = await createOrder(
                plan,
                fullName,
                cleanPhone,
                formData.email
            );

            await refresh();

            const message = `Hola, envío comprobante de pago con llave/QR para el *${plan.name}* (Ref: ${order.reference}).`;
            openWhatsApp('573332260032', message);

            navigate(`/pago/resultado?ref=${order.reference}`);
        } catch (error) {
            console.error('Error al procesar pago:', error);
            alert('Hubo un error al procesar tu pedido. Por favor intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Steps Header */}
            <div className="flex border-b">
                <div className={cn("flex-1 py-4 text-center text-sm font-medium border-b-2 transition-colors", step === 1 ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400")}>
                    1. Tus Datos
                </div>
                <div className={cn("flex-1 py-4 text-center text-sm font-medium border-b-2 transition-colors", step === 2 ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400")}>
                    2. Pago Manual
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
                {step === 1 ? (
                    <div className="space-y-6 animate-fade-in">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                                    placeholder="Juan"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                                    placeholder="Pérez"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp (Para entregas)</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                                    placeholder="300 123 4567"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico (Opcional)</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                                    placeholder="juan@ejemplo.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/25 mt-4"
                        >
                            Continuar al Pago
                        </button>
                    </div>
                ) : (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 flex items-start gap-3">
                            <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-blue-800">
                                Escanea el QR o usa la Llave para pagar. Envía el comprobante para activar.
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-6">
                            {/* QR Section */}
                            <div className="relative group cursor-pointer" onClick={() => window.open('/QR.jpeg', '_blank')}>
                                <div className="w-64 h-64 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-blue-500 transition">
                                    <img
                                        src="/QR.jpeg"
                                        alt="QR de Pago"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300?text=QR+CODE'
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-white font-bold">
                                        Click para ampliar
                                    </div>
                                </div>
                            </div>

                            {/* Keys Section */}
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-500 mb-2 text-center">Llave de Pago (Nequi/Bancolombia)</label>
                                <div className="flex items-center gap-2 max-w-xs mx-auto">
                                    <div className="flex-1 bg-gray-100 px-4 py-3 rounded-xl font-mono text-center font-bold text-lg tracking-wider border border-gray-200">
                                        @LDF628
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => copyToClipboard('@LDF628', 'key')}
                                        className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition border border-gray-200"
                                        title="Copiar Llave"
                                    >
                                        {copied === 'key' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="text-center pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={cn(
                                    "w-full flex items-center justify-center gap-2 font-bold py-4 rounded-xl transition shadow-lg text-white",
                                    loading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-green-600 hover:bg-green-700 shadow-green-600/25"
                                )}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleManualConfirmation();
                                }}
                            >
                                {
                                    loading ? 'Procesando...' : (
                                        <>
                                            <MessageCircle className="w-5 h-5" />
                                            Ya pagué, Enviar Comprobante
                                        </>
                                    )
                                }
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="mt-4 text-sm text-gray-500 hover:text-gray-700"
                            >
                                Volver a Datos
                            </button>
                        </div >
                    </div >
                )
                }
            </form >

            <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Lock className="w-3 h-3" />
                Tus datos están seguros y encriptados.
            </div>
        </div >
    );
};
