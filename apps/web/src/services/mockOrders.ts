import type { Plan } from "./mockData";

export type OrderStatus =
    | 'CREATED'
    | 'PENDING_PAYMENT'
    | 'PAID'
    | 'PENDING_ACTIVATION'
    | 'ACTIVATED'
    | 'FAILED'
    | 'REFUND_REQUESTED'
    | 'REFUNDED';

export interface Order {
    id: string; // Internal ID
    ref: string; // Wompi/Public reference (e.g. ORD-123)
    planId: string;
    amount: number;
    customerName: string;
    customerWhatsApp: string;
    customerEmail?: string;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
}

// In-memory storage for mock orders (resets on reload, use localStorage for persistence if needed)
const MOCK_ORDERS_STORAGE_KEY = 'unistudy_mock_orders';

const loadOrders = (): Order[] => {
    const stored = localStorage.getItem(MOCK_ORDERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

const saveOrder = (order: Order) => {
    const orders = loadOrders();
    orders.push(order);
    localStorage.setItem(MOCK_ORDERS_STORAGE_KEY, JSON.stringify(orders));
};

export const createMockOrder = async (
    plan: Plan,
    customerName: string,
    customerWhatsApp: string,
    customerEmail?: string
): Promise<Order> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const now = new Date().toISOString();
    const ref = `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

    const newOrder: Order = {
        id: crypto.randomUUID(),
        ref,
        planId: plan.id,
        amount: plan.price,
        customerName,
        customerWhatsApp,
        customerEmail,
        status: 'PENDING_ACTIVATION', // Skip payment for MVP mock
        createdAt: now,
        updatedAt: now
    };

    saveOrder(newOrder);
    return newOrder;
};

export const getMockOrder = async (ref: string): Promise<Order | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const orders = loadOrders();
    return orders.find(o => o.ref === ref) || null;
};
