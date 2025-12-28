import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { getMockOrder, type Order } from '../services/mockOrders';
import { CheckCircle, Clock, AlertTriangle, ArrowRight } from 'lucide-react';

const PaymentResult: React.FC = () => {
    const [searchParams] = useSearchParams();
    const ref = searchParams.get('ref');
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (ref) {
            getMockOrder(ref).then(setOrder).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [ref]);

    if (loading) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="animate-pulse text-gray-400">Cargando estado del pedido...</div>
                </div>
            </Layout>
        );
    }

    if (!order) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                    <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Pedido no encontrado</h1>
                    <p className="text-gray-600 mb-8">No pudimos encontrar la información de este pedido.</p>
                    <Link to="/" className="text-blue-600 font-semibold hover:underline">Volver al inicio</Link>
                </div>
            </Layout>
        );
    }

    const isSuccess = ['PAID', 'PENDING_ACTIVATION', 'ACTIVATED'].includes(order.status);

    return (
        <Layout>
            <div className="min-h-[calc(100vh-64px)] py-16 bg-gray-50 flex items-center justify-center px-4">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg max-w-xl w-full text-center">
                    {isSuccess ? (
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle className="w-10 h-10" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h1>
                            <p className="text-gray-500 mb-8">Referencia: <span className="font-mono text-gray-900">{order.ref}</span></p>

                            <div className="bg-blue-50 rounded-2xl p-6 w-full mb-8 text-left">
                                <h3 className="font-bold text-blue-900 flex items-center gap-2 mb-2">
                                    <Clock className="w-5 h-5" /> Siguientes Pasos
                                </h3>
                                <p className="text-blue-800 text-sm mb-4">
                                    Tu plan está en proceso de activación manual.
                                </p>
                                <ol className="list-decimal list-inside text-sm text-blue-800 space-y-2">
                                    <li>Recibirás un mensaje en tu WhatsApp: <strong>{order.customerWhatsApp}</strong>.</li>
                                    <li>Te enviaremos las credenciales de acceso.</li>
                                    <li>Tiempo estimado: <strong>&lt; 2 horas</strong> (horario laboral).</li>
                                </ol>
                            </div>

                            <Link
                                to="/"
                                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition w-full md:w-auto"
                            >
                                Volver al Inicio <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="text-center">
                            <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                            <h1 className="text-2xl font-bold mb-4">Estado: {order.status}</h1>
                            <p className="text-gray-600 mb-6">Tu pago está siendo procesado o ha ocurrido un error.</p>
                            <Link to="/soporte" className="text-blue-600 font-bold hover:underline">Contactar Soporte</Link>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default PaymentResult;
