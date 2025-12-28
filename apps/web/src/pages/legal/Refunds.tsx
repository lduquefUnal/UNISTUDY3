import React from 'react';
import { Layout } from '../../components/layout/Layout';

const Refunds: React.FC = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8">Política de Reembolsos</h1>
                <div className="prose prose-blue max-w-none">
                    <h2>Garantía de Satisfacción 24 Horas</h2>
                    <p>En Unistudy queremos que estés 100% feliz con tu compra.</p>

                    <h3>¿Cómo funciona?</h3>
                    <p>Si dentro de las primeras 24 horas después de recibir tus accesos no estás satisfecho con el servicio, puedes solicitar el reembolso total de tu dinero.</p>

                    <h3>Proceso</h3>
                    <ol>
                        <li>Escríbenos a soporte (WhatsApp o Email).</li>
                        <li>Indica tu referencia de pedido.</li>
                        <li>Procesaremos tu devolución inmediatamente (puede tardar 1-3 días hábiles en reflejarse en tu banco).</li>
                    </ol>
                </div>
            </div>
        </Layout>
    );
};

export default Refunds;
