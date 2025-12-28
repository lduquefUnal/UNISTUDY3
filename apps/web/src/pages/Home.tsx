import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Globe, Star } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';
import { Reviews } from '../components/home/Reviews';
import { Layout } from '../components/layout/Layout';

const Home: React.FC = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-32">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 -z-10" />
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-100/30 to-transparent blur-3xl rounded-full translate-x-1/2" />

                <div className="container mx-auto px-4 text-center max-w-4xl relative">
                    <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-blue-100 rounded-full px-4 py-1.5 text-sm font-medium text-blue-700 mb-8 shadow-sm animate-fade-in-up">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Plataforma #1 para Estudiantes
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
                        Potencia tu estudio con <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Herramientas Premium</span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Accede a las mejores herramientas de inteligencia artificial y diseño a una fracción del costo.
                        Únete a más de <span className="font-semibold text-gray-900">5,000 estudiantes</span> que ya ahorran con nosotros.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/planes"
                            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 flex items-center justify-center gap-2 transform hover:-translate-y-1"
                        >
                            Ver Planes <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/faq"
                            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 transition hover:border-gray-300 flex items-center justify-center gap-2"
                        >
                            Cómo funciona
                        </Link>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-8 text-gray-400 grayscale opacity-70">
                        {/* Mock Logos */}
                        <span className="font-bold text-xl">Notion</span>
                        <span className="font-bold text-xl">Canva</span>
                        <span className="font-bold text-xl">ChatGPT</span>
                        <span className="font-bold text-xl">Midjourney</span>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <Reviews />

            {/* Features Grid */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Por qué elegir Unistudy?</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">Diseñado pensando en tu seguridad y economía.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Zap}
                            title="Activación Rápida"
                            desc="Recibe tus accesos en menos de 2 horas directamente en tu WhatsApp."
                        />
                        <FeatureCard
                            icon={ShieldCheck}
                            title="100% Garantizado"
                            desc="Si no funciona, te devolvemos tu dinero. Sin preguntas ni complicaciones."
                        />
                        <FeatureCard
                            icon={Globe}
                            title="Soporte Local"
                            desc="Hablamos tu idioma. Soporte real por WhatsApp en horario extendido."
                        />
                    </div>
                </div>
            </section>
        </Layout>
    );
};

const FeatureCard = ({ icon: Icon, title, desc }: any) => (
    <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-300 group">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-7 h-7 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-500 leading-relaxed">{desc}</p>
    </div>
);

export default Home;
