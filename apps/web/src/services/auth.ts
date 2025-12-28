export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin';
}

const STORAGE_KEY = 'unistudy_auth_user';

export const authService = {
    login: async (email: string, password: string): Promise<User> => {
        // Mock login - accept any valid email structure and a specific mock password or generic
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay

        // Simple mock check
        if (password === 'admin123' || password === 'test') {
            const user: User = {
                id: 'u1',
                email,
                name: 'Admin User',
                role: 'admin'
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
            return user;
        }

        throw new Error('Credenciales inválidas');
    },

    logout: () => {
        localStorage.removeItem(STORAGE_KEY);
        window.location.href = '/admin/login';
    },

    getUser: (): User | null => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem(STORAGE_KEY);
    }
};
