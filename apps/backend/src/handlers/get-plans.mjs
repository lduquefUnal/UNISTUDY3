import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.PLANS_TABLE;

const INITIAL_PLANS = [
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
];

export const handler = async (event) => {
    console.log("Received event:", JSON.stringify(event));

    try {
        const data = await docClient.send(new ScanCommand({ TableName: TABLE_NAME }));
        let items = data.Items || [];

        // Auto-seed if empty
        if (items.length === 0) {
            console.log("Seeding table...");
            const putPromises = INITIAL_PLANS.map(plan =>
                docClient.send(new PutCommand({ TableName: TABLE_NAME, Item: plan }))
            );
            await Promise.all(putPromises);
            items = INITIAL_PLANS;
        }

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(items)
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" })
        };
    }
};
