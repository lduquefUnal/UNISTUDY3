import { graphqlRequest } from './appsyncClient';

export interface ClientRecord {
    phone: string;
    name: string;
    email?: string | null;
    createdAt: string;
    notes?: string | null;
}

type ListClientsResponse = {
    listClients: {
        items: ClientRecord[];
        nextToken?: string | null;
    };
};

type CreateClientResponse = { createClient: ClientRecord };

type UpdateClientResponse = { updateClient: ClientRecord };

type GetClientResponse = { getClient: ClientRecord | null };

const LIST_CLIENTS_QUERY = /* GraphQL */ `
  query ListClients($limit: Int, $nextToken: String) {
    listClients(limit: $limit, nextToken: $nextToken) {
      items {
        phone
        name
        email
        createdAt
        notes
      }
      nextToken
    }
  }
`;

const GET_CLIENT_QUERY = /* GraphQL */ `
  query GetClient($phone: ID!) {
    getClient(phone: $phone) {
      phone
      name
      email
      createdAt
      notes
    }
  }
`;

const CREATE_CLIENT_MUTATION = /* GraphQL */ `
  mutation CreateClient($input: CreateClientInput!) {
    createClient(input: $input) {
      phone
      name
      email
      createdAt
      notes
    }
  }
`;

const UPDATE_CLIENT_MUTATION = /* GraphQL */ `
  mutation UpdateClient($phone: ID!, $input: UpdateClientInput!) {
    updateClient(phone: $phone, input: $input) {
      phone
      name
      email
      createdAt
      notes
    }
  }
`;

const STORAGE_KEY = 'unistudy_clients';
const API_MODE = import.meta.env.VITE_API_MODE ?? 'mock';
const USE_LIVE_API = API_MODE === 'live';

const loadFromStorage = (): ClientRecord[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

const saveToStorage = (clients: ClientRecord[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
};

export const listClients = async (): Promise<ClientRecord[]> => {
    if (!USE_LIVE_API) {
        return loadFromStorage();
    }

    try {
        const data = await graphqlRequest<ListClientsResponse>(LIST_CLIENTS_QUERY, { limit: 200 });
        const clients = data.listClients.items;
        saveToStorage(clients);
        return clients;
    } catch (error) {
        console.error('Error loading clients from AppSync:', error);
        return loadFromStorage();
    }
};

export const getClient = async (phone: string): Promise<ClientRecord | null> => {
    if (!USE_LIVE_API) {
        return loadFromStorage().find(client => client.phone === phone) || null;
    }

    const data = await graphqlRequest<GetClientResponse>(GET_CLIENT_QUERY, { phone });
    return data.getClient ?? null;
};

export const createClient = async (client: Omit<ClientRecord, 'createdAt'>): Promise<ClientRecord> => {
    if (!USE_LIVE_API) {
        const now = new Date().toISOString();
        const newClient: ClientRecord = { ...client, createdAt: now };
        const clients = loadFromStorage();
        const nextClients = clients.filter(item => item.phone !== client.phone);
        nextClients.push(newClient);
        saveToStorage(nextClients);
        return newClient;
    }

    const data = await graphqlRequest<CreateClientResponse>(CREATE_CLIENT_MUTATION, {
        input: client
    });
    return data.createClient;
};

export const updateClient = async (phone: string, updates: Partial<ClientRecord>): Promise<ClientRecord> => {
    if (!USE_LIVE_API) {
        const clients = loadFromStorage();
        const nextClients = clients.map(client => (
            client.phone === phone ? { ...client, ...updates } : client
        ));
        saveToStorage(nextClients);
        const updated = nextClients.find(client => client.phone === phone);
        if (!updated) {
            throw new Error('Client not found');
        }
        return updated;
    }

    const data = await graphqlRequest<UpdateClientResponse>(UPDATE_CLIENT_MUTATION, {
        phone,
        input: updates
    });
    return data.updateClient;
};
