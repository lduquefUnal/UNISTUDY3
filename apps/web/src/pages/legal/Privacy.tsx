import React from 'react';
import { Layout } from '../../components/layout/Layout';

const Privacy: React.FC = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8">Política de Privacidad</h1>
                <div className="prose prose-blue max-w-none">
                    <h2>1. Recolección de Datos</h2>
                    <p>Solo recolectamos los datos estrictamente necesarios para prestar el servicio: Número de WhatsApp y Correo Electrónico.</p>

                    <h2>2. Uso de la información</h2>
                    <p>Tus datos se usan exclusivamente para entregarte los accesos, enviarte recordatorios de vencimiento y soporte técnico.</p>

                    <h2>3. Protección</h2>
                    <p>No compartimos ni vendemos tus datos a terceros. Toda la información sensible está cifrada.</p>
                </div>
            </div>
        </Layout>
    );
};

export default Privacy;
