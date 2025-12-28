import awsconfig from '../aws-exports';

type GraphQLError = {
    message: string;
    path?: string[];
    extensions?: Record<string, unknown>;
};

type GraphQLResponse<T> = {
    data?: T;
    errors?: GraphQLError[];
};

const getEndpoint = () => {
    return import.meta.env.VITE_APPSYNC_ENDPOINT || awsconfig.aws_appsync_graphqlEndpoint;
};

const getApiKey = () => {
    return import.meta.env.VITE_APPSYNC_API_KEY as string | undefined;
};

export const graphqlRequest = async <T>(query: string, variables?: Record<string, unknown>): Promise<T> => {
    const endpoint = getEndpoint();
    if (!endpoint) {
        throw new Error('Missing AppSync endpoint. Set VITE_APPSYNC_ENDPOINT.');
    }

    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };

    const apiKey = getApiKey();
    if (apiKey) {
        headers['x-api-key'] = apiKey;
    }

    const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query, variables })
    });

    if (!response.ok) {
        throw new Error(`AppSync request failed (${response.status})`);
    }

    const payload = (await response.json()) as GraphQLResponse<T>;
    if (payload.errors?.length) {
        const messages = payload.errors.map(error => error.message).join('; ');
        throw new Error(messages || 'AppSync error');
    }

    if (!payload.data) {
        throw new Error('Empty AppSync response');
    }

    return payload.data;
};
