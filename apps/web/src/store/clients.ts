
import { create } from 'zustand';
import type { ClientRecord } from '../services/clientsService';
import { listClients } from '../services/clientsService';
import { listOrders, updateOrderStatus as updateOrderStatusApi, type Order, type OrderStatus } from '../services/mockOrders';

export interface Client {
    id: string; // Phone number as ID is simple and effective for this MVP
    name: string;
    phone: string;
    email: string;
    createdAt: string;
    notes?: string;
    history: OrderHistory[];
}

export interface OrderHistory {
    id: string;
    plan: string;
    date: string;
    status: 'pending' | 'active' | 'expired' | 'closed';
}

interface ClientStore {
    clients: Client[];
    orders: Order[];
    loading: boolean;
    refresh: () => Promise<void>;
    getClientByPhone: (phone: string) => Client | undefined;
    updateOrderStatus: (orderId: string, status: OrderHistory['status']) => Promise<void>;
}

const mapStatusToHistory = (status: OrderStatus): OrderHistory['status'] => {
    switch (status) {
        case 'ACTIVE':
            return 'active';
        case 'EXPIRED':
            return 'expired';
        case 'CLOSED':
        case 'REFUNDED':
            return 'closed';
        case 'PENDING':
        default:
            return 'pending';
    }
};

const mapStatusToApi = (status: OrderHistory['status']): OrderStatus => {
    switch (status) {
        case 'active':
            return 'ACTIVE';
        case 'expired':
            return 'EXPIRED';
        case 'closed':
            return 'CLOSED';
        case 'pending':
        default:
            return 'PENDING';
    }
};

const buildClientsWithHistory = (clients: ClientRecord[], orders: Order[]): Client[] => {
    const historyByClient = new Map<string, OrderHistory[]>();

    orders.forEach(order => {
        const historyItem: OrderHistory = {
            id: order.orderId,
            plan: order.planName || order.planId,
            date: order.createdAt,
            status: mapStatusToHistory(order.status)
        };

        const existing = historyByClient.get(order.clientPhone) || [];
        existing.push(historyItem);
        historyByClient.set(order.clientPhone, existing);
    });

    return clients.map(client => ({
        id: client.phone,
        name: client.name,
        phone: client.phone,
        email: client.email || '',
        createdAt: client.createdAt,
        notes: client.notes || undefined,
        history: historyByClient.get(client.phone) || []
    }));
};

export const useClientStore = create<ClientStore>((set, get) => ({
    clients: [],
    orders: [],
    loading: false,

    refresh: async () => {
        set({ loading: true });
        try {
            const [clients, orders] = await Promise.all([listClients(), listOrders()]);
            set({
                clients: buildClientsWithHistory(clients, orders),
                orders,
                loading: false
            });
        } catch (error) {
            console.error('Error loading clients/orders:', error);
            set({ loading: false });
        }
    },

    getClientByPhone: (phone) => {
        return get().clients.find(c => c.phone === phone);
    },

    updateOrderStatus: async (orderId, status) => {
        const apiStatus = mapStatusToApi(status);
        await updateOrderStatusApi(orderId, apiStatus);

        set((state) => {
            const nextOrders = state.orders.map(order =>
                order.orderId === orderId ? { ...order, status: apiStatus } : order
            );
            const nextClients = state.clients.map(client => ({
                ...client,
                history: client.history.map(history =>
                    history.id === orderId ? { ...history, status } : history
                )
            }));

            return { orders: nextOrders, clients: nextClients };
        });
    }
}));
