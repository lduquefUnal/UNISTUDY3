import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.ORDERS_TABLE;

export const handler = async (event) => {
    console.log("Received event:", JSON.stringify(event));

    try {
        if (!event.body) {
            return { statusCode: 400, body: JSON.stringify({ message: "Missing body" }) };
        }

        const body = JSON.parse(event.body);
        const { plan, customerWhatsApp, customerEmail } = body;

        if (!plan || !customerWhatsApp) {
            return { statusCode: 400, body: JSON.stringify({ message: "Missing required fields" }) };
        }

        const now = new Date().toISOString();
        const ref = `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

        const newOrder = {
            id: randomUUID(),
            ref,
            planId: plan.id,
            amount: plan.price,
            customerWhatsApp,
            customerEmail: customerEmail || "",
            status: 'PENDING_ACTIVATION',
            createdAt: now,
            updatedAt: now
        };

        await docClient.send(new PutCommand({
            TableName: TABLE_NAME,
            Item: newOrder
        }));

        return {
            statusCode: 201,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newOrder)
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" })
        };
    }
};
