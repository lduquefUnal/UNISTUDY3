import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.ORDERS_TABLE;

export const handler = async (event) => {
    console.log("Received event:", JSON.stringify(event));

    try {
        const { ref } = event.pathParameters;
        if (!ref) {
            return { statusCode: 400, body: JSON.stringify({ message: "Missing ref" }) };
        }

        const data = await docClient.send(new GetCommand({
            TableName: TABLE_NAME,
            Key: { ref }
        }));

        if (!data.Item) {
            return { statusCode: 404, body: JSON.stringify({ message: "Order not found" }) };
        }

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data.Item)
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" })
        };
    }
};
