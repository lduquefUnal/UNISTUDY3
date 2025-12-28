import { MOCK_PLANS, type Plan } from './mockData';

const STORAGE_KEY = 'unistudy_plans';
export const PLANS_UPDATED_EVENT = 'unistudy:plans-updated';

const dispatchPlansUpdate = () => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event(PLANS_UPDATED_EVENT));
    }
};

export const getPlans = (): Plan[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : MOCK_PLANS;
};

export const savePlans = (plans: Plan[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
    dispatchPlansUpdate();
};

export const resetPlans = () => {
    localStorage.removeItem(STORAGE_KEY);
    dispatchPlansUpdate();
};

export const getPlanById = (id?: string): Plan | undefined => {
    if (!id) return undefined;
    return getPlans().find(plan => plan.id === id);
};
