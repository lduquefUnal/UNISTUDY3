import React from 'react';
import { Layout } from '../../components/layout/Layout';

const Terms: React.FC = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8">Términos y Condiciones</h1>
                <div className="prose prose-blue max-w-none">
                    <p>Última actualización: {new Date().toLocaleDateString()}</p>
                    <h2>1. Introducción</h2>
                    <p>Bienvenido a Unistudy. Al acceder a nuestro sitio web y adquirir nuestros servicios, aceptas estos términos en su totalidad.</p>

                    <h2>2. Servicios</h2>
                    <p>Unistudy ofrece acceso facilitado a diversas herramientas digitales. No somos propietarios de las herramientas subyacentes (como ChatGPT, Canva, etc.), solo facilitamos el acceso compartido y gestionado.</p>

                    <h2>3. Pagos y Reembolsos</h2>
                    <p>Los pagos son mensuales y anticipados. Ofrecemos una garantía de satisfacción de 24 horas desde el momento de la activación.</p>

                    <h2>4. Uso Aceptable</h2>
                    <p>El usuario se compromete a usar las cuentas proporcionadas de manera responsable y personal. Compartir credenciales con terceros está prohibido.</p>
                </div>
            </div>
        </Layout>
    );
};

export default Terms;
