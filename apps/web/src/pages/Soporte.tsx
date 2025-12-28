import { Layout } from '../components/layout/Layout';
import { MessageCircle, Mail, Clock } from 'lucide-react';

const Soporte: React.FC = () => {
    return (
        <Layout>
            <div className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Centro de Ayuda</h1>
                        <p className="text-gray-600">
                            Nuestro equipo está listo para ayudarte con cualquier problema o duda que tengas sobre tu plan.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* WhatsApp Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MessageCircle className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp</h3>
                            <p className="text-gray-500 mb-6 text-sm">Respuesta en ~5 minutos</p>
                            <a
                                href="https://wa.me/573000000000"
                                target="_blank"
                                className="inline-block w-full py-2 px-4 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition"
                            >
                                Abrir Chat
                            </a>
                        </div>

                        {/* Email Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Mail className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Correo Electrónico</h3>
                            <p className="text-gray-500 mb-6 text-sm">Respuesta en ~24 horas</p>
                            <a
                                href="mailto:soporte@unistudy.com"
                                className="inline-block w-full py-2 px-4 rounded-lg bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition"
                            >
                                Enviar Correo
                            </a>
                        </div>

                        {/* Schedule Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Clock className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Horario de Atención</h3>
                            <p className="text-gray-500 mb-4 text-sm">Estamos disponibles para ti:</p>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li>Lunes a Viernes: <span className="font-semibold">8am - 6pm</span></li>
                                <li>Sábados: <span className="font-semibold">9am - 1pm</span></li>
                                <li>Domingos: <span className="text-gray-400">Cerrado</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Soporte;
