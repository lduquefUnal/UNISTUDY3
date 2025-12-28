import React from 'react';
import { Layout } from '../components/layout/Layout';
import { seedDemoClients } from '../utils/seedDemo';

const Debug: React.FC = () => {
    const handleSeedDemo = () => {
        seedDemoClients();
        alert('✅ 3 Clientes demo agregados! Ve a /admin/crm y /admin/recordatorios');
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-20">
                <h1 className="text-3xl font-bold mb-8">Debug / Herramientas de Desarrollo</h1>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 className="text-xl font-bold mb-4">Datos de Prueba</h2>
                    <button
                        onClick={handleSeedDemo}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        🌱 Agregar 3 Clientes Demo
                    </button>
                    <p className="text-sm text-gray-500 mt-2">
                        Crea 3 clientes con diferentes estados de renovación para probar el sistema de recordatorios
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Debug;
