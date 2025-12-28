export const SEED_DATA = {
    plans: [
        {
            id: 'imagen-pro',
            name: 'Plan Imagen Pro',
            price: 24000,
            period: 'mes',
            description: 'Acceso a chatgpt plus herramientas populares de edicion visual y creatividad.',
            features: [
                'Acceso a chatgpt plus 1 mes',
                'Activacion manual en menos de 2h',
                'Cuenta compartida',
                'vscode con extensiones IA',
                'Uso mensual flexible sin suscripciones'
            ],
            highlight: 'Ideal para creadores visuales',
            isRecommended: true
        },
        {
            id: 'diseno-creativo',
            name: 'Plan Diseno Creativo',
            price: 20000,
            period: 'mes',
            description: 'Acompanamiento para asistentes IA de productividad y estudio con enfoque personal.',
            features: [
                'Acceso a Canva Pro 6 meses',
                'Activacion manual en menos de 2h',
                'con tu correo personal!',
                'Herramientas IA integradas',
                'Kit de marca',
                'paginas web'
            ],
            highlight: 'Perfecto para emprendedores y creadores',
            isRecommended: true
        },
        {
            id: 'ia-avanzada',
            name: 'Plan IA Avanzada',
            price: 129000,
            period: 'mes',
            description: 'Acceso guiado a varias herramientas de edicion y asistentes IA en un solo plan.',
            features: [
                'Acesso a Gemini Pro cuenta privada 1 mes',
                'Activacion manual en menos de 2h',
                'Herramientas IA integradas',
                'extension vscode con IA',
                'Uso mensual flexible sin suscripciones'
            ],
            highlight: 'Perfecto para programadores y profesionales',
            isRecommended: true
        },
        {
            id: 'aprendizaje-plus',
            name: 'Plan Aprendizaje Plus',
            price: 120000,
            period: 'mes',
            description: 'Acceso a cursos y especializaciones para mejorar tus habilidades profesionales.',
            features: [
                '12 meses de acceso a Coursera Pro',
                'Activacion manual en menos de 2h',
                'Herramientas IA integradas'
            ],
            isRecommended: false
        },
        {
            id: 'video-pro',
            name: 'Plan Video Pro',
            price: 160000,
            period: 'mes',
            description: 'Acceso a herramientas avanzadas de edicion de video y efectos visuales.',
            features: [
                '12 meses de acceso a Capcut Pro',
                'Activacion manual en menos de 2h',
                'Herramientas IA integradas'
            ],
            isRecommended: false
        }
    ],
    faqs: [
        {
            id: '1',
            category: 'General',
            question: '¿Necesito crear una cuenta para comprar?',
            answer: 'No, en Unistudy valoramos tu tiempo. Puedes comprar como invitado, solo necesitamos tu WhatsApp y correo para entregarte el acceso.'
        },
        {
            id: '2',
            category: 'Pagos',
            question: '¿Qué métodos de pago aceptan?',
            answer: 'Aceptamos pagos seguros a través de Wompi (Bancolombia, Nequi, Tarjetas) y Stripe para pagos internacionales.'
        },
        {
            id: '3',
            category: 'Servicio',
            question: '¿Cuánto tiempo tarda la activación?',
            answer: 'La activación es manual por parte de nuestro equipo. Generalmente toma menos de 2 horas en horario laboral (8am - 6pm COT).'
        },
        {
            id: '4',
            category: 'Servicio',
            question: '¿Tienen garantía de reembolso?',
            answer: 'Sí, ofrecemos una garantía de satisfacción de 24 horas. Si no estás feliz con el servicio, te devolvemos tu dinero sin preguntas.'
        }
    ],
    testimonials: [
        {
            id: 't1',
            name: 'Ana María G.',
            role: 'Estudiante de Diseño',
            content: 'Increíble servicio. Me ahorra mucho dinero al mes tener acceso a estas herramientas en un solo lugar.'
        },
        {
            id: 't2',
            name: 'Carlos R.',
            role: 'Freelancer',
            content: 'El soporte es muy rápido, tuve un problema con un acceso y me lo resolvieron por WhatsApp en 5 minutos.',
            avatarUrl: 'https://i.pravatar.cc/150?u=carlos'
        }
    ]
};
