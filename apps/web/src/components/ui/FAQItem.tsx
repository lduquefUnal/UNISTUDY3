import React, { useState } from 'react';
import type { FAQ } from '../../services/mockData';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FAQItemProps {
    faq: FAQ;
}

export const FAQItem: React.FC<FAQItemProps> = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-100 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-5 text-left focus:outline-none"
            >
                <span className={cn("text-lg font-medium", isOpen ? "text-blue-600" : "text-gray-900")}>
                    {faq.question}
                </span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
            </button>
            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-48 opacity-100 mb-5" : "max-h-0 opacity-0"
                )}
            >
                <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                </p>
            </div>
        </div>
    );
};
