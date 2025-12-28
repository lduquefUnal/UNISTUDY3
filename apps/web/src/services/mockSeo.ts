
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

const STORAGE_KEY_GLOBAL = 'unistudy_seo_global';
const STORAGE_KEY_PAGES = 'unistudy_seo_pages';
const API_MODE = import.meta.env.VITE_API_MODE ?? 'mock';
const USE_LIVE_API = API_MODE === 'live';

type SeoGlobalResponse = { getSeoGlobal: SeoGlobalConfig | null };
type SeoPagesResponse = { listSeoPages: SeoPageConfig[] };
type UpdateSeoGlobalResponse = { updateSeoGlobal: SeoGlobalConfig };
type UpsertSeoPageResponse = { upsertSeoPage: SeoPageConfig };

const GET_SEO_GLOBAL_QUERY = /* GraphQL */ `
  query GetSeoGlobal {
    getSeoGlobal {
      siteName
      defaultTitle
      defaultDescription
      baseUrl
      ogImageUrl
      social {
        facebook
        instagram
        tiktok
      }
      contact {
        whatsapp
        email
      }
    }
  }
`;

const LIST_SEO_PAGES_QUERY = /* GraphQL */ `
  query ListSeoPages {
    listSeoPages {
      path
      title
      description
      ogImage
      keywords
      noindex
    }
  }
`;

const UPDATE_SEO_GLOBAL_MUTATION = /* GraphQL */ `
  mutation UpdateSeoGlobal($input: UpdateSeoGlobalInput!) {
    updateSeoGlobal(input: $input) {
      siteName
      defaultTitle
      defaultDescription
      baseUrl
      ogImageUrl
      social {
        facebook
        instagram
        tiktok
      }
      contact {
        whatsapp
        email
      }
    }
  }
`;

const UPSERT_SEO_PAGE_MUTATION = /* GraphQL */ `
  mutation UpsertSeoPage($input: UpsertSeoPageInput!) {
    upsertSeoPage(input: $input) {
      path
      title
      description
      ogImage
      keywords
      noindex
    }
  }
`;

let cachedGlobal: SeoGlobalConfig = DEFAULT_GLOBAL;
let cachedPages: SeoPageConfig[] = DEFAULT_PAGES;

const loadGlobalFromStorage = (): SeoGlobalConfig => {
    const stored = localStorage.getItem(STORAGE_KEY_GLOBAL);
    return stored ? JSON.parse(stored) : DEFAULT_GLOBAL;
};

const loadPagesFromStorage = (): SeoPageConfig[] => {
    const stored = localStorage.getItem(STORAGE_KEY_PAGES);
    return stored ? JSON.parse(stored) : DEFAULT_PAGES;
};

export const getSeoGlobal = (): SeoGlobalConfig => cachedGlobal;

export const getSeoPages = (): SeoPageConfig[] => cachedPages;

export const loadSeoGlobal = async (): Promise<SeoGlobalConfig> => {
    if (!USE_LIVE_API) {
        cachedGlobal = loadGlobalFromStorage();
        return cachedGlobal;
    }

    const { graphqlRequest } = await import('./appsyncClient');
    try {
        const data = await graphqlRequest<SeoGlobalResponse>(GET_SEO_GLOBAL_QUERY);
        cachedGlobal = data.getSeoGlobal || DEFAULT_GLOBAL;
        localStorage.setItem(STORAGE_KEY_GLOBAL, JSON.stringify(cachedGlobal));
        return cachedGlobal;
    } catch (error) {
        console.error('Error loading SEO global from AppSync:', error);
        cachedGlobal = loadGlobalFromStorage();
        return cachedGlobal;
    }
};

export const loadSeoPages = async (): Promise<SeoPageConfig[]> => {
    if (!USE_LIVE_API) {
        cachedPages = loadPagesFromStorage();
        return cachedPages;
    }

    const { graphqlRequest } = await import('./appsyncClient');
    try {
        const data = await graphqlRequest<SeoPagesResponse>(LIST_SEO_PAGES_QUERY);
        cachedPages = data.listSeoPages.length ? data.listSeoPages : DEFAULT_PAGES;
        localStorage.setItem(STORAGE_KEY_PAGES, JSON.stringify(cachedPages));
        return cachedPages;
    } catch (error) {
        console.error('Error loading SEO pages from AppSync:', error);
        cachedPages = loadPagesFromStorage();
        return cachedPages;
    }
};

export const saveSeoGlobal = async (config: SeoGlobalConfig) => {
    if (!USE_LIVE_API) {
        cachedGlobal = config;
        localStorage.setItem(STORAGE_KEY_GLOBAL, JSON.stringify(config));
        return;
    }

    const { graphqlRequest } = await import('./appsyncClient');
    const data = await graphqlRequest<UpdateSeoGlobalResponse>(UPDATE_SEO_GLOBAL_MUTATION, {
        input: config
    });
    cachedGlobal = data.updateSeoGlobal;
    localStorage.setItem(STORAGE_KEY_GLOBAL, JSON.stringify(cachedGlobal));
};

export const saveSeoPages = async (pages: SeoPageConfig[]) => {
    if (!USE_LIVE_API) {
        cachedPages = pages;
        localStorage.setItem(STORAGE_KEY_PAGES, JSON.stringify(pages));
        return;
    }

    const { graphqlRequest } = await import('./appsyncClient');
    const savedPages: SeoPageConfig[] = [];
    for (const page of pages) {
        const data = await graphqlRequest<UpsertSeoPageResponse>(UPSERT_SEO_PAGE_MUTATION, {
            input: page
        });
        savedPages.push(data.upsertSeoPage);
    }
    cachedPages = savedPages;
    localStorage.setItem(STORAGE_KEY_PAGES, JSON.stringify(cachedPages));
};

export const getSeoForPath = (path: string): SeoPageConfig | undefined => {
    return cachedPages.find(p => p.path === path);
};
