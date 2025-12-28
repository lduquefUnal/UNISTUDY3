
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
    status: 'pending' | 'active' | 'expired';
}

interface ClientStore {
    clients: Client[];
    addClient: (client: Omit<Client, 'history'>) => void;
    addOrderToClient: (phone: string, order: OrderHistory) => void;
    getClientByPhone: (phone: string) => Client | undefined;
    updateClient: (id: string, updates: Partial<Client>) => void;
}

export const useClientStore = create<ClientStore>()(
    persist(
        (set, get) => ({
            clients: [],

            addClient: (newClient) => set((state) => {
                const exists = state.clients.find(c => c.phone === newClient.phone);
                if (exists) return state; // Don't duplicate
                return {
                    clients: [...state.clients, { ...newClient, history: [] }]
                };
            }),

            addOrderToClient: (phone, order) => set((state) => ({
                clients: state.clients.map(client =>
                    client.phone === phone
                        ? { ...client, history: [...client.history, order] }
                        : client
                )
            })),

            getClientByPhone: (phone) => {
                return get().clients.find(c => c.phone === phone);
            },

            updateClient: (id, updates) => set((state) => ({
                clients: state.clients.map(c => c.id === id ? { ...c, ...updates } : c)
            }))
        }),
        {
            name: 'unistudy-clients-storage', // unique name for localStorage key
        }
    )
);
