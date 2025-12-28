import { SEED_DATA } from '../data/seed';

export interface Plan {
    id: string;
    name: string;
    price: number;
    period: string; // 'mensual'
    features: string[];
    isRecommended?: boolean;
    highlight?: string;
    description: string;
    availableSpots?: number; // Simulated logic
}

export interface FAQ {
    id: string;
    category: string;
    question: string;
    answer: string;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    avatarUrl?: string;
}

export const MOCK_PLANS: Plan[] = SEED_DATA.plans;

export const MOCK_FAQS: FAQ[] = SEED_DATA.faqs;

export const MOCK_TESTIMONIALS: Testimonial[] = SEED_DATA.testimonials;
