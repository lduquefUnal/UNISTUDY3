
export interface SeoPageConfig {
    path: string;
    title: string;
    description: string;
    ogImage?: string;
    keywords?: string;
    noindex?: boolean;
}

export interface SeoGlobalConfig {
    siteName: string;
    defaultTitle: string;
    defaultDescription: string;
    baseUrl: string;
    ogImageUrl: string;
    social: {
        facebook?: string;
        instagram?: string;
        tiktok?: string;
    };
    contact: {
        whatsapp: string;
        email: string;
    };
}

const DEFAULT_GLOBAL: SeoGlobalConfig = {
    siteName: 'Unistudy',
    defaultTitle: 'Unistudy - Herramientas Premium para Estudiantes',
    defaultDescription: 'Accede a herramientas premium de estudio, diseño y programación a precios accesibles. Cuentas compartidas y seguras.',
    baseUrl: 'https://unistudy.co',
    ogImageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200',
    social: {
        instagram: 'https://instagram.com/unistudy_co'
    },
    contact: {
        whatsapp: '573332260032',
        email: 'soporte@unistudy.co'
    }
};

const DEFAULT_PAGES: SeoPageConfig[] = [
    {
        path: '/',
        title: 'Unistudy | Herramientas Digitales Económicas',
        description: 'Potencia tu aprendizaje con Canva Pro, ChatGPT, Coursera y más por una fracción del precio. Activación rápida y soporte 24/7.',
        keywords: 'canva pro barato, chatgpt plus colombia, cuentas compartidas, estudiantes, software educativo'
    },
    {
        path: '/planes',
        title: 'Planes y Precios | Unistudy',
        description: 'Elige el plan perfecto para ti: Diseño, Programación, IA y Aprendizaje. Precios desde $20.000 COP.',
        keywords: 'precios unistudy, planes canva, planes chatgpt'
    },
    {
        path: '/faq',
        title: 'Preguntas Frecuentes | Unistudy',
        description: 'Resuelve tus dudas sobre cómo funciona el servicio, métodos de pago y garantías.',
    },
    {
        path: '/blog',
        title: 'Blog y Tips | Unistudy',
        description: 'Consejos para estudiantes, trucos de IA y tutoriales de diseño para sacar el máximo provecho a tus herramientas.',
    }
];

// Mock persistence
const STORAGE_KEY_GLOBAL = 'unistudy_seo_global';
const STORAGE_KEY_PAGES = 'unistudy_seo_pages';

export const getSeoGlobal = (): SeoGlobalConfig => {
    const stored = localStorage.getItem(STORAGE_KEY_GLOBAL);
    return stored ? JSON.parse(stored) : DEFAULT_GLOBAL;
};

export const saveSeoGlobal = (config: SeoGlobalConfig) => {
    localStorage.setItem(STORAGE_KEY_GLOBAL, JSON.stringify(config));
};

export const getSeoPages = (): SeoPageConfig[] => {
    const stored = localStorage.getItem(STORAGE_KEY_PAGES);
    return stored ? JSON.parse(stored) : DEFAULT_PAGES;
};

export const saveSeoPages = (pages: SeoPageConfig[]) => {
    localStorage.setItem(STORAGE_KEY_PAGES, JSON.stringify(pages));
};

export const getSeoForPath = (path: string): SeoPageConfig | undefined => {
    const pages = getSeoPages();
    return pages.find(p => p.path === path);
};
