import type { Plan } from './mockData';
import { graphqlRequest } from './appsyncClient';

export type OrderStatus = 'PENDING' | 'ACTIVE' | 'EXPIRED' | 'CLOSED' | 'REFUNDED';

export interface Order {
    orderId: string;
    reference: string;
    clientPhone: string;
    clientName?: string;
    planId: string;
    planName?: string;
    amount: number;
    status: OrderStatus;
    createdAt: string;
    expiresAt?: string | null;
    customerEmail?: string | null;
}

type ApiOrder = {
    orderId: string;
    reference: string;
    clientPhone: string;
    clientName?: string | null;
    planId: string;
    planName?: string | null;
    amount: number;
    status: OrderStatus;
    createdAt: string;
    expiresAt?: string | null;
    customerEmail?: string | null;
};

type ListOrdersResponse = {
    listOrders: {
        items: ApiOrder[];
        nextToken?: string | null;
    };
};

type GetOrderResponse = {
    getOrder: ApiOrder | null;
};

type CreateOrderResponse = {
    createOrder: ApiOrder;
};

type UpdateOrderResponse = {
    updateOrder: ApiOrder;
};

const LIST_ORDERS_QUERY = /* GraphQL */ `
  query ListOrders($limit: Int, $nextToken: String) {
    listOrders(limit: $limit, nextToken: $nextToken) {
      items {
        orderId
        reference
        clientPhone
        clientName
        planId
        planName
        amount
        status
        createdAt
        expiresAt
        customerEmail
      }
      nextToken
    }
  }
`;

const GET_ORDER_QUERY = /* GraphQL */ `
  query GetOrder($orderId: ID!) {
    getOrder(orderId: $orderId) {
      orderId
      reference
      clientPhone
      clientName
      planId
      planName
      amount
      status
      createdAt
      expiresAt
      customerEmail
    }
  }
`;

const CREATE_ORDER_MUTATION = /* GraphQL */ `
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      orderId
      reference
      clientPhone
      clientName
      planId
      planName
      amount
      status
      createdAt
      expiresAt
      customerEmail
    }
  }
`;

const UPDATE_ORDER_MUTATION = /* GraphQL */ `
  mutation UpdateOrder($orderId: ID!, $input: UpdateOrderInput!) {
    updateOrder(orderId: $orderId, input: $input) {
      orderId
      reference
      clientPhone
      clientName
      planId
      planName
      amount
      status
      createdAt
      expiresAt
      customerEmail
    }
  }
`;

const STORAGE_KEY = 'unistudy_orders';
const API_MODE = import.meta.env.VITE_API_MODE ?? 'mock';
const USE_LIVE_API = API_MODE === 'live';

const loadOrdersFromStorage = (): Order[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

const saveOrdersToStorage = (orders: Order[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

const mapOrder = (order: ApiOrder): Order => ({
    orderId: order.orderId,
    reference: order.reference,
    clientPhone: order.clientPhone,
    clientName: order.clientName ?? undefined,
    planId: order.planId,
    planName: order.planName ?? undefined,
    amount: order.amount,
    status: order.status,
    createdAt: order.createdAt,
    expiresAt: order.expiresAt ?? undefined,
    customerEmail: order.customerEmail ?? undefined
});

export const listOrders = async (): Promise<Order[]> => {
    if (!USE_LIVE_API) {
        return loadOrdersFromStorage();
    }

    try {
        const data = await graphqlRequest<ListOrdersResponse>(LIST_ORDERS_QUERY, { limit: 200 });
        const orders = data.listOrders.items.map(mapOrder);
        saveOrdersToStorage(orders);
        return orders;
    } catch (error) {
        console.error('Error loading orders from AppSync:', error);
        return loadOrdersFromStorage();
    }
};

export const getOrderByReference = async (reference: string): Promise<Order | null> => {
    if (!USE_LIVE_API) {
        const orders = loadOrdersFromStorage();
        return orders.find(order => order.reference === reference) || null;
    }

    try {
        const data = await graphqlRequest<GetOrderResponse>(GET_ORDER_QUERY, { orderId: reference });
        return data.getOrder ? mapOrder(data.getOrder) : null;
    } catch (error) {
        console.error('Error loading order from AppSync:', error);
        return null;
    }
};

export const createOrder = async (
    plan: Plan,
    customerName: string,
    customerPhone: string,
    customerEmail?: string
): Promise<Order> => {
    const reference = `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

    if (!USE_LIVE_API) {
        const now = new Date().toISOString();
        const newOrder: Order = {
            orderId: reference,
            reference,
            clientPhone: customerPhone,
            clientName: customerName,
            planId: plan.id,
            planName: plan.name,
            amount: plan.price,
            status: 'PENDING',
            createdAt: now,
            customerEmail
        };
        const orders = loadOrdersFromStorage();
        const nextOrders = [newOrder, ...orders];
        saveOrdersToStorage(nextOrders);
        return newOrder;
    }

    const data = await graphqlRequest<CreateOrderResponse>(CREATE_ORDER_MUTATION, {
        input: {
            clientPhone: customerPhone,
            clientName: customerName,
            planId: plan.id,
            planName: plan.name,
            amount: plan.price,
            status: 'PENDING',
            reference,
            customerEmail
        }
    });

    return mapOrder(data.createOrder);
};

export const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    if (!USE_LIVE_API) {
        const orders = loadOrdersFromStorage();
        const nextOrders = orders.map(order => order.orderId === orderId ? { ...order, status } : order);
        saveOrdersToStorage(nextOrders);
        return;
    }

    await graphqlRequest<UpdateOrderResponse>(UPDATE_ORDER_MUTATION, {
        orderId,
        input: { status }
    });
};
