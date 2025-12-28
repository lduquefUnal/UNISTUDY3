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

# Mutation: updateClient
echo "Creating resolver: Mutation.updateClient"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Mutation \
  --field-name updateClient \
  --data-source-name UnistudyClientsDataSource \
  --request-mapping-template file://resolvers/updateClient-request.vtl \
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
  --request-mapping-template file://resolvers/listOrders-request.vtl \
  --response-mapping-template file://resolvers/list-response.vtl \
  --region $REGION

# Query: getOrder
echo "Creating resolver: Query.getOrder"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Query \
  --field-name getOrder \
  --data-source-name UnistudyOrdersDataSource \
  --request-mapping-template file://resolvers/getOrder-request.vtl \
  --response-mapping-template file://resolvers/response.vtl \
  --region $REGION

# Query: getOrdersByClient
echo "Creating resolver: Query.getOrdersByClient"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Query \
  --field-name getOrdersByClient \
  --data-source-name UnistudyOrdersDataSource \
  --request-mapping-template file://resolvers/getOrdersByClient-request.vtl \
  --response-mapping-template file://resolvers/list-items-response.vtl \
  --region $REGION

# Mutation: updateOrder
echo "Creating resolver: Mutation.updateOrder"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Mutation \
  --field-name updateOrder \
  --data-source-name UnistudyOrdersDataSource \
  --request-mapping-template file://resolvers/updateOrder-request.vtl \
  --response-mapping-template file://resolvers/response.vtl \
  --region $REGION

# Query: listPlans
echo "Creating resolver: Query.listPlans"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Query \
  --field-name listPlans \
  --data-source-name UnistudyPlansDataSource \
  --request-mapping-template file://resolvers/listPlans-request.vtl \
  --response-mapping-template file://resolvers/list-items-response.vtl \
  --region $REGION

# Query: getPlan
echo "Creating resolver: Query.getPlan"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Query \
  --field-name getPlan \
  --data-source-name UnistudyPlansDataSource \
  --request-mapping-template file://resolvers/getPlan-request.vtl \
  --response-mapping-template file://resolvers/response.vtl \
  --region $REGION

# Mutation: createPlan
echo "Creating resolver: Mutation.createPlan"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Mutation \
  --field-name createPlan \
  --data-source-name UnistudyPlansDataSource \
  --request-mapping-template file://resolvers/createPlan-request.vtl \
  --response-mapping-template file://resolvers/response.vtl \
  --region $REGION

# Mutation: updatePlan
echo "Creating resolver: Mutation.updatePlan"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Mutation \
  --field-name updatePlan \
  --data-source-name UnistudyPlansDataSource \
  --request-mapping-template file://resolvers/updatePlan-request.vtl \
  --response-mapping-template file://resolvers/response.vtl \
  --region $REGION

# Query: listBlogPosts
echo "Creating resolver: Query.listBlogPosts"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Query \
  --field-name listBlogPosts \
  --data-source-name UnistudyBlogPostsDataSource \
  --request-mapping-template file://resolvers/listBlogPosts-request.vtl \
  --response-mapping-template file://resolvers/list-items-response.vtl \
  --region $REGION

# Query: getBlogPost
echo "Creating resolver: Query.getBlogPost"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Query \
  --field-name getBlogPost \
  --data-source-name UnistudyBlogPostsDataSource \
  --request-mapping-template file://resolvers/getBlogPost-request.vtl \
  --response-mapping-template file://resolvers/response.vtl \
  --region $REGION

# Mutation: createBlogPost
echo "Creating resolver: Mutation.createBlogPost"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Mutation \
  --field-name createBlogPost \
  --data-source-name UnistudyBlogPostsDataSource \
  --request-mapping-template file://resolvers/createBlogPost-request.vtl \
  --response-mapping-template file://resolvers/response.vtl \
  --region $REGION

# Mutation: updateBlogPost
echo "Creating resolver: Mutation.updateBlogPost"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Mutation \
  --field-name updateBlogPost \
  --data-source-name UnistudyBlogPostsDataSource \
  --request-mapping-template file://resolvers/updateBlogPost-request.vtl \
  --response-mapping-template file://resolvers/response.vtl \
  --region $REGION

# Query: getSeoGlobal
echo "Creating resolver: Query.getSeoGlobal"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Query \
  --field-name getSeoGlobal \
  --data-source-name UnistudySeoGlobalDataSource \
  --request-mapping-template file://resolvers/getSeoGlobal-request.vtl \
  --response-mapping-template file://resolvers/response.vtl \
  --region $REGION

# Mutation: updateSeoGlobal
echo "Creating resolver: Mutation.updateSeoGlobal"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Mutation \
  --field-name updateSeoGlobal \
  --data-source-name UnistudySeoGlobalDataSource \
  --request-mapping-template file://resolvers/updateSeoGlobal-request.vtl \
  --response-mapping-template file://resolvers/response.vtl \
  --region $REGION

# Query: listSeoPages
echo "Creating resolver: Query.listSeoPages"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Query \
  --field-name listSeoPages \
  --data-source-name UnistudySeoPagesDataSource \
  --request-mapping-template file://resolvers/listSeoPages-request.vtl \
  --response-mapping-template file://resolvers/list-items-response.vtl \
  --region $REGION

# Mutation: upsertSeoPage
echo "Creating resolver: Mutation.upsertSeoPage"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Mutation \
  --field-name upsertSeoPage \
  --data-source-name UnistudySeoPagesDataSource \
  --request-mapping-template file://resolvers/upsertSeoPage-request.vtl \
  --response-mapping-template file://resolvers/response.vtl \
  --region $REGION

# Mutation: deleteSeoPage
echo "Creating resolver: Mutation.deleteSeoPage"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Mutation \
  --field-name deleteSeoPage \
  --data-source-name UnistudySeoPagesDataSource \
  --request-mapping-template file://resolvers/deleteSeoPage-request.vtl \
  --response-mapping-template file://resolvers/response.vtl \
  --region $REGION

# Query: getReminderTemplate
echo "Creating resolver: Query.getReminderTemplate"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Query \
  --field-name getReminderTemplate \
  --data-source-name UnistudyReminderTemplateDataSource \
  --request-mapping-template file://resolvers/getReminderTemplate-request.vtl \
  --response-mapping-template file://resolvers/response.vtl \
  --region $REGION

# Mutation: updateReminderTemplate
echo "Creating resolver: Mutation.updateReminderTemplate"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Mutation \
  --field-name updateReminderTemplate \
  --data-source-name UnistudyReminderTemplateDataSource \
  --request-mapping-template file://resolvers/updateReminderTemplate-request.vtl \
  --response-mapping-template file://resolvers/response.vtl \
  --region $REGION

# Query: listReminderOverrides
echo "Creating resolver: Query.listReminderOverrides"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Query \
  --field-name listReminderOverrides \
  --data-source-name UnistudyReminderOverridesDataSource \
  --request-mapping-template file://resolvers/listReminderOverrides-request.vtl \
  --response-mapping-template file://resolvers/list-items-response.vtl \
  --region $REGION

# Mutation: setReminderOverride
echo "Creating resolver: Mutation.setReminderOverride"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Mutation \
  --field-name setReminderOverride \
  --data-source-name UnistudyReminderOverridesDataSource \
  --request-mapping-template file://resolvers/setReminderOverride-request.vtl \
  --response-mapping-template file://resolvers/response.vtl \
  --region $REGION

# Mutation: deleteReminderOverride
echo "Creating resolver: Mutation.deleteReminderOverride"
aws appsync create-resolver \
  --api-id $API_ID \
  --type-name Mutation \
  --field-name deleteReminderOverride \
  --data-source-name UnistudyReminderOverridesDataSource \
  --request-mapping-template file://resolvers/deleteReminderOverride-request.vtl \
  --response-mapping-template file://resolvers/response.vtl \
  --region $REGION

echo "✅ Resolvers created successfully!"
