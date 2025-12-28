import React, { useMemo, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { openWhatsApp } from '../../utils/whatsapp';

interface WhatsAppActionsProps {
    phone: string;
    customerName: string;
    planName: string;
}

type TemplateKey = 'welcome' | 'reminder' | 'support' | 'custom';

const TEMPLATE_TEXT: Record<Exclude<TemplateKey, 'custom'>, string> = {
    welcome: '¡Hola {name}! 👋 Bienvenido a Unistudy. Hemos confirmado tu pago del *{plan}*. Aquí tienes tus accesos: [LINK]',
    reminder: 'Hola {name}, notamos que iniciaste el proceso de compra del *{plan}* pero no recibimos el comprobante. ¿Necesitas ayuda?',
    support: 'Hola {name}, soy del equipo de soporte de Unistudy. ¿En qué te puedo ayudar hoy?'
};

const applyTemplate = (template: string, customerName: string, planName: string) => {
    const firstName = customerName.split(' ')[0] || customerName;
    return template
        .replace(/\{name\}/g, firstName)
        .replace(/\{plan\}/g, planName);
};

export const WhatsAppActions: React.FC<WhatsAppActionsProps> = ({ phone, customerName, planName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [templateKey, setTemplateKey] = useState<TemplateKey>('welcome');
    const [messageDraft, setMessageDraft] = useState(TEMPLATE_TEXT.welcome);

    const previewMessage = useMemo(
        () => applyTemplate(messageDraft, customerName, planName),
        [messageDraft, customerName, planName]
    );

    const handleTemplateChange = (value: TemplateKey) => {
        setTemplateKey(value);
        if (value !== 'custom') {
            setMessageDraft(TEMPLATE_TEXT[value]);
        }
    };

    const handleSend = () => {
        openWhatsApp(`57${phone}`, previewMessage);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 font-medium"
                title="Enviar mensaje por WhatsApp"
            >
                <MessageCircle className="w-4 h-4" />
                Mensaje
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white shadow-xl border border-gray-100 rounded-xl p-4 z-20">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-gray-700">Mensaje personalizado</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-gray-600"
                            type="button"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <label className="block text-xs font-medium text-gray-600 mb-1">Plantilla</label>
                    <select
                        className="w-full border border-gray-200 rounded-lg text-xs p-2 mb-3"
                        value={templateKey}
                        onChange={(event) => handleTemplateChange(event.target.value as TemplateKey)}
                    >
                        <option value="welcome">Bienvenida</option>
                        <option value="reminder">Recordatorio</option>
                        <option value="support">Soporte</option>
                        <option value="custom">Personalizado</option>
                    </select>

                    <label className="block text-xs font-medium text-gray-600 mb-1">Mensaje</label>
                    <textarea
                        className="w-full border border-gray-200 rounded-lg text-xs p-2 h-24 mb-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={messageDraft}
                        onChange={(event) => setMessageDraft(event.target.value)}
                    />
                    <p className="text-[11px] text-gray-400 mb-3">
                        Usa {`{name}`} y {`{plan}`} para personalizar.
                    </p>

                    <button
                        onClick={handleSend}
                        className="w-full bg-green-600 text-white text-xs font-semibold py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                        <Send className="w-4 h-4" />
                        Enviar por WhatsApp
                    </button>
                </div>
            )}
        </div>
    );
};
