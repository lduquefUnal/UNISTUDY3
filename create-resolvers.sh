#!/bin/bash

API_ID="v43hc6cuejflhfpncunun5tefy"
REGION="us-east-1"

echo "🚀 Creating AppSync Resolvers..."

# Mutation: createClient
echo "Creating resolver: Mutation.createClient"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Mutation \
  --field-name createClient \
  --data-source-name UnistudyClientsDataSource \
  --request-mapping-template file://resolvers/createClient-request.vtl \
  --response-mapping-template file://resolvers/response.vtl \
  --region $REGION

# Query: listClients
echo "Creating resolver: Query.listClients"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Query \
  --field-name listClients \
  --data-source-name UnistudyClientsDataSource \
  --request-mapping-template file://resolvers/listClients-request.vtl \
  --response-mapping-template file://resolvers/list-response.vtl \
  --region $REGION

# Query: getClient
echo "Creating resolver: Query.getClient"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Query \
  --field-name getClient \
  --data-source-name UnistudyClientsDataSource \
  --request-mapping-template file://resolvers/getClient-request.vtl \
  --response-mapping-template file://resolvers/response.vtl \
  --region $REGION

# Mutation: createOrder
echo "Creating resolver: Mutation.createOrder"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Mutation \
  --field-name createOrder \
  --data-source-name UnistudyOrdersDataSource \
  --request-mapping-template file://resolvers/createOrder-request.vtl \
  --response-mapping-template file://resolvers/response.vtl \
  --region $REGION

# Query: listOrders
echo "Creating resolver: Query.listOrders"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Query \
  --field-name listOrders \
  --data-source-name UnistudyOrdersDataSource \
  --request-mapping-template file://resolvers/listClients-request.vtl \
  --response-mapping-template file://resolvers/list-response.vtl \
  --region $REGION

echo "✅ Resolvers created successfully!"
