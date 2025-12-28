import { SEOHead } from '../components/seo/SEOHead';
import { Layout } from '../components/layout/Layout';
import { MOCK_FAQS } from '../services/mockData';
import { FAQItem } from '../components/ui/FAQItem';
import { openWhatsApp } from '../utils/whatsapp';

const FAQ = () => {
    return (
        <Layout>
            <SEOHead />
            <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                        Preguntas Frecuentes
                    </h1>
                    <p className="text-center text-gray-600 mb-12">
                        Resolvemos tus dudas principales para que compres con confianza.
                    </p>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                        {MOCK_FAQS.map((faq) => (
                            <FAQItem key={faq.id} faq={faq} />
                        ))}
                    </div>

                    <div className="mt-16 text-center bg-blue-50 rounded-2xl p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">¿No encontraste tu respuesta?</h2>
                        <p className="text-gray-600 mb-8">Nuestro equipo de soporte está disponible para ayudarte.</p>
                        <button
                            onClick={() => openWhatsApp('573332260032')}
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 md:text-lg transition shadow-lg shadow-blue-600/20"
                        >
                            Contactar Soporte
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FAQ;
