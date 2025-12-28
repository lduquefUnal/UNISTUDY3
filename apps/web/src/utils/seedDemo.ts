import { useClientStore } from '../store/clients';
import { createClient } from '../services/clientsService';
import { createOrder } from '../services/mockOrders';
import { MOCK_PLANS } from '../services/mockData';

// Run this once to seed demo data
export const seedDemoClients = async () => {
    if (import.meta.env.VITE_API_MODE === 'live') {
        console.warn('seedDemoClients is disabled in live mode.');
        return;
    }

    const { refresh } = useClientStore.getState();
    const fallbackPlan = MOCK_PLANS[0];

    // Cliente 1: María Fernanda - Plan reciente (15 días)
    const client1Phone = '3001234567';
    await createClient({
        name: 'María Fernanda López',
        phone: client1Phone,
        email: 'maria.lopez@gmail.com',
        notes: 'Cliente frecuente, muy puntual'
    });

    await createOrder(
        fallbackPlan,
        'María Fernanda López',
        client1Phone,
        'maria.lopez@gmail.com'
    );

    // Cliente 2: Carlos Andrés - Plan próximo a vencer (28 días)
    const client2Phone = '3109876543';
    await createClient({
        name: 'Carlos Andrés Ramírez',
        phone: client2Phone,
        email: 'carlos.ramirez@outlook.com',
        notes: 'Le gusta el plan Canva'
    });

    await createOrder(
        fallbackPlan,
        'Carlos Andrés Ramírez',
        client2Phone,
        'carlos.ramirez@outlook.com'
    );

    // Cliente 3: Laura Sofia - Plan vencido (45 días) - URGENTE
    const client3Phone = '3205551122';
    await createClient({
        name: 'Laura Sofia Torres',
        phone: client3Phone,
        email: 'laura.torres@gmail.com',
        notes: 'Necesita seguimiento urgente'
    });

    await createOrder(
        fallbackPlan,
        'Laura Sofia Torres',
        client3Phone,
        'laura.torres@gmail.com'
    );

    await refresh();

    console.log('✅ 3 clientes demo agregados con éxito!');
    console.log('- María (15 días) - No aparece en recordatorios aún');
    console.log('- Carlos (28 días) - Aparece en recordatorios (⚠️ Naranja)');
    console.log('- Laura (45 días) - Aparece en recordatorios (🔴 URGENTE)');
};
