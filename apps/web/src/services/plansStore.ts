import { MOCK_PLANS, type Plan } from './mockData';
import { graphqlRequest } from './appsyncClient';

const STORAGE_KEY = 'unistudy_plans';
export const PLANS_UPDATED_EVENT = 'unistudy:plans-updated';
const API_MODE = import.meta.env.VITE_API_MODE ?? 'mock';
const USE_LIVE_API = API_MODE === 'live';

type GraphQLPlan = {
    planId: string;
    name: string;
    description: string;
    price: number;
    period: string;
    features: string[];
    isRecommended?: boolean | null;
    highlight?: string | null;
    availableSpots?: number | null;
    isActive?: boolean | null;
};

type CreatePlanInput = {
    planId: string;
    name: string;
    description: string;
    price: number;
    period: string;
    features: string[];
    isRecommended?: boolean | null;
    highlight?: string | null;
    availableSpots?: number | null;
    isActive?: boolean | null;
};

type UpdatePlanInput = Omit<CreatePlanInput, 'planId'>;

type ListPlansResponse = { listPlans: GraphQLPlan[] };
type GetPlanResponse = { getPlan: GraphQLPlan | null };
type CreatePlanResponse = { createPlan: GraphQLPlan };
type UpdatePlanResponse = { updatePlan: GraphQLPlan };

const LIST_PLANS_QUERY = /* GraphQL */ `
  query ListPlans {
    listPlans {
      planId
      name
      description
      price
      period
      features
      isRecommended
      highlight
      availableSpots
      isActive
    }
  }
`;

const GET_PLAN_QUERY = /* GraphQL */ `
  query GetPlan($planId: ID!) {
    getPlan(planId: $planId) {
      planId
      name
      description
      price
      period
      features
      isRecommended
      highlight
      availableSpots
      isActive
    }
  }
`;

const CREATE_PLAN_MUTATION = /* GraphQL */ `
  mutation CreatePlan($input: CreatePlanInput!) {
    createPlan(input: $input) {
      planId
      name
      description
      price
      period
      features
      isRecommended
      highlight
      availableSpots
      isActive
    }
  }
`;

const UPDATE_PLAN_MUTATION = /* GraphQL */ `
  mutation UpdatePlan($planId: ID!, $input: UpdatePlanInput!) {
    updatePlan(planId: $planId, input: $input) {
      planId
      name
      description
      price
      period
      features
      isRecommended
      highlight
      availableSpots
      isActive
    }
  }
`;

const dispatchPlansUpdate = () => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event(PLANS_UPDATED_EVENT));
    }
};

const loadPlansFromStorage = (): Plan[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : MOCK_PLANS;
};

const savePlansToStorage = (plans: Plan[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
};

const mapPlan = (plan: GraphQLPlan): Plan => ({
    id: plan.planId,
    name: plan.name,
    description: plan.description,
    price: plan.price ?? 0,
    period: plan.period ?? 'mes',
    features: plan.features ?? [],
    isRecommended: plan.isRecommended ?? false,
    highlight: plan.highlight ?? undefined,
    availableSpots: plan.availableSpots ?? undefined,
    isActive: plan.isActive ?? true
});

const toBasePlanInput = (plan: Plan): UpdatePlanInput => ({
    name: plan.name,
    description: plan.description,
    price: plan.price,
    period: plan.period,
    features: plan.features,
    isRecommended: plan.isRecommended ?? false,
    highlight: plan.highlight ?? null,
    availableSpots: plan.availableSpots ?? null,
    isActive: plan.isActive ?? true
});

const toCreatePlanInput = (plan: Plan): CreatePlanInput => ({
    planId: plan.id,
    ...toBasePlanInput(plan)
});

export const listPlans = async (): Promise<Plan[]> => {
    if (!USE_LIVE_API) {
        return loadPlansFromStorage();
    }

    try {
        const data = await graphqlRequest<ListPlansResponse>(LIST_PLANS_QUERY);
        const plans = data.listPlans
            .map(mapPlan)
            .filter(plan => plan.isActive !== false);
        savePlansToStorage(plans);
        return plans;
    } catch (error) {
        console.error('Error loading plans from AppSync:', error);
        return loadPlansFromStorage();
    }
};

export const getPlanById = async (id?: string): Promise<Plan | undefined> => {
    if (!id) return undefined;

    if (!USE_LIVE_API) {
        return loadPlansFromStorage().find(plan => plan.id === id);
    }

    try {
        const data = await graphqlRequest<GetPlanResponse>(GET_PLAN_QUERY, { planId: id });
        return data.getPlan ? mapPlan(data.getPlan) : undefined;
    } catch (error) {
        console.error('Error loading plan from AppSync:', error);
        return loadPlansFromStorage().find(plan => plan.id === id);
    }
};

export const createPlan = async (plan: Plan): Promise<Plan> => {
    if (!USE_LIVE_API) {
        const plans = loadPlansFromStorage();
        const nextPlans = [plan, ...plans];
        savePlansToStorage(nextPlans);
        dispatchPlansUpdate();
        return plan;
    }

    const data = await graphqlRequest<CreatePlanResponse>(CREATE_PLAN_MUTATION, {
        input: toCreatePlanInput(plan)
    });
    const saved = mapPlan(data.createPlan);
    dispatchPlansUpdate();
    return saved;
};

export const updatePlan = async (plan: Plan): Promise<Plan> => {
    if (!USE_LIVE_API) {
        const plans = loadPlansFromStorage();
        const nextPlans = plans.map(item => item.id === plan.id ? plan : item);
        savePlansToStorage(nextPlans);
        dispatchPlansUpdate();
        return plan;
    }

    const data = await graphqlRequest<UpdatePlanResponse>(UPDATE_PLAN_MUTATION, {
        planId: plan.id,
        input: toBasePlanInput(plan)
    });
    const saved = mapPlan(data.updatePlan);
    dispatchPlansUpdate();
    return saved;
};

export const deletePlan = async (planId: string): Promise<void> => {
    if (!USE_LIVE_API) {
        const plans = loadPlansFromStorage();
        const nextPlans = plans.filter(plan => plan.id !== planId);
        savePlansToStorage(nextPlans);
        dispatchPlansUpdate();
        return;
    }

    const existing = await getPlanById(planId);
    if (!existing) return;
    await updatePlan({ ...existing, isActive: false });
};

export const resetPlans = () => {
    localStorage.removeItem(STORAGE_KEY);
    dispatchPlansUpdate();
};
