import React from 'react';
import { MessageCircle } from 'lucide-react';
import { openWhatsApp } from '../../utils/whatsapp';

interface WhatsAppActionsProps {
    phone: string;
    customerName: string;
    planName: string;
}

export const WhatsAppActions: React.FC<WhatsAppActionsProps> = ({ phone, customerName, planName }) => {

    const handleAction = (message: string) => {
        openWhatsApp('57' + phone, message);
    };

    const sendTemplate = (type: 'welcome' | 'reminder' | 'support') => {
        let message = '';
        const firstName = customerName.split(' ')[0];

        switch (type) {
            case 'welcome':
                message = `¡Hola ${firstName}! 👋 Bienvenido a Unistudy. Hemos confirmado tu pago del *${planName}*. Aquí tienes tus accesos: [LINK]`;
                break;
            case 'reminder':
                message = `Hola ${firstName}, notamos que iniciaste el proceso de compra del *${planName}* pero no recibimos el comprobante. ¿Necesitas ayuda?`;
                break;
            case 'support':
                message = `Hola ${firstName}, soy del equipo de soporte de Unistudy. ¿En qué te puedo ayudar hoy?`;
                break;
        }

        handleAction(message);
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={() => sendTemplate('welcome')}
                className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition"
                title="Enviar Bienvenida"
            >
                <MessageCircle className="w-4 h-4" />
            </button>
            <div className="relative group">
                <button className="text-xs text-gray-500 hover:text-blue-600 font-medium">Más...</button>
                <div className="absolute right-0 top-full mt-1 bg-white shadow-lg border border-gray-100 rounded-lg p-1 w-32 hidden group-hover:block z-10">
                    <button onClick={() => sendTemplate('reminder')} className="text-left w-full text-xs px-2 py-1.5 hover:bg-gray-50 rounded text-gray-700">Recordar Pago</button>
                    <button onClick={() => sendTemplate('support')} className="text-left w-full text-xs px-2 py-1.5 hover:bg-gray-50 rounded text-gray-700">Soporte</button>
                </div>
            </div>
        </div>
    );
};
