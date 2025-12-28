import { useClientStore } from '../store/clients';

// Run this once to seed demo data
export const seedDemoClients = () => {
    const { addClient, addOrderToClient } = useClientStore.getState();

    // Cliente 1: María Fernanda - Plan reciente (15 días)
    const client1Phone = '3001234567';
    addClient({
        id: client1Phone,
        name: 'María Fernanda López',
        phone: client1Phone,
        email: 'maria.lopez@gmail.com',
        createdAt: new Date().toISOString(),
        notes: 'Cliente frecuente, muy puntual'
    });

    const date15DaysAgo = new Date();
    date15DaysAgo.setDate(date15DaysAgo.getDate() - 15);
    addOrderToClient(client1Phone, {
        id: `ORD-${Date.now()}-1`,
        plan: 'Plan Imagen Pro',
        date: date15DaysAgo.toISOString(),
        status: 'active'
    });

    // Cliente 2: Carlos Andrés - Plan próximo a vencer (28 días)
    const client2Phone = '3109876543';
    addClient({
        id: client2Phone,
        name: 'Carlos Andrés Ramírez',
        phone: client2Phone,
        email: 'carlos.ramirez@outlook.com',
        createdAt: new Date().toISOString(),
        notes: 'Le gusta el plan Canva'
    });

    const date28DaysAgo = new Date();
    date28DaysAgo.setDate(date28DaysAgo.getDate() - 28);
    addOrderToClient(client2Phone, {
        id: `ORD-${Date.now()}-2`,
        plan: 'Plan Video Pro',
        date: date28DaysAgo.toISOString(),
        status: 'active'
    });

    // Cliente 3: Laura Sofia - Plan vencido (45 días) - URGENTE
    const client3Phone = '3205551122';
    addClient({
        id: client3Phone,
        name: 'Laura Sofia Torres',
        phone: client3Phone,
        email: 'laura.torres@gmail.com',
        createdAt: new Date().toISOString(),
        notes: 'Necesita seguimiento urgente'
    });

    const date45DaysAgo = new Date();
    date45DaysAgo.setDate(date45DaysAgo.getDate() - 45);
    addOrderToClient(client3Phone, {
        id: `ORD-${Date.now()}-3`,
        plan: 'Plan IA Avanzada',
        date: date45DaysAgo.toISOString(),
        status: 'active'
    });

    console.log('✅ 3 clientes demo agregados con éxito!');
    console.log('- María (15 días) - No aparece en recordatorios aún');
    console.log('- Carlos (28 días) - Aparece en recordatorios (⚠️ Naranja)');
    console.log('- Laura (45 días) - Aparece en recordatorios (🔴 URGENTE)');
};
