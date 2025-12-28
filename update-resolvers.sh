#!/bin/bash
set -euo pipefail

API_ID="v43hc6cuejflhfpncunun5tefy"
REGION="us-east-1"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

upsert_resolver() {
  local type_name="$1"
  local field_name="$2"
  local data_source="$3"
  local request_template="file://$SCRIPT_DIR/$4"
  local response_template="file://$SCRIPT_DIR/$5"

  if aws appsync get-resolver \
    --api-id "$API_ID" \
    --type-name "$type_name" \
    --field-name "$field_name" \
    --region "$REGION" >/dev/null 2>&1; then
    echo "Updating resolver: ${type_name}.${field_name}"
    aws appsync update-resolver \
      --api-id "$API_ID" \
      --type-name "$type_name" \
      --field-name "$field_name" \
      --data-source-name "$data_source" \
      --request-mapping-template "$request_template" \
      --response-mapping-template "$response_template" \
      --region "$REGION"
  else
    echo "Creating resolver: ${type_name}.${field_name}"
    aws appsync create-resolver \
      --api-id "$API_ID" \
      --type-name "$type_name" \
      --field-name "$field_name" \
      --data-source-name "$data_source" \
      --request-mapping-template "$request_template" \
      --response-mapping-template "$response_template" \
      --region "$REGION"
  fi
}

echo "🚀 Upserting AppSync Resolvers..."

# Clients
upsert_resolver "Query" "listClients" "UnistudyClientsDataSource" "resolvers/listClients-request.vtl" "resolvers/list-response.vtl"
upsert_resolver "Query" "getClient" "UnistudyClientsDataSource" "resolvers/getClient-request.vtl" "resolvers/response.vtl"
upsert_resolver "Mutation" "createClient" "UnistudyClientsDataSource" "resolvers/createClient-request.vtl" "resolvers/response.vtl"
upsert_resolver "Mutation" "updateClient" "UnistudyClientsDataSource" "resolvers/updateClient-request.vtl" "resolvers/response.vtl"

# Orders
upsert_resolver "Query" "listOrders" "UnistudyOrdersDataSource" "resolvers/listOrders-request.vtl" "resolvers/list-response.vtl"
upsert_resolver "Query" "getOrder" "UnistudyOrdersDataSource" "resolvers/getOrder-request.vtl" "resolvers/response.vtl"
upsert_resolver "Query" "getOrdersByClient" "UnistudyOrdersDataSource" "resolvers/getOrdersByClient-request.vtl" "resolvers/list-items-response.vtl"
upsert_resolver "Mutation" "createOrder" "UnistudyOrdersDataSource" "resolvers/createOrder-request.vtl" "resolvers/response.vtl"
upsert_resolver "Mutation" "updateOrder" "UnistudyOrdersDataSource" "resolvers/updateOrder-request.vtl" "resolvers/response.vtl"

# Plans
upsert_resolver "Query" "listPlans" "UnistudyPlansDataSource" "resolvers/listPlans-request.vtl" "resolvers/list-items-response.vtl"
upsert_resolver "Query" "getPlan" "UnistudyPlansDataSource" "resolvers/getPlan-request.vtl" "resolvers/response.vtl"
upsert_resolver "Mutation" "createPlan" "UnistudyPlansDataSource" "resolvers/createPlan-request.vtl" "resolvers/response.vtl"
upsert_resolver "Mutation" "updatePlan" "UnistudyPlansDataSource" "resolvers/updatePlan-request.vtl" "resolvers/response.vtl"

# Blog
upsert_resolver "Query" "listBlogPosts" "UnistudyBlogPostsDataSource" "resolvers/listBlogPosts-request.vtl" "resolvers/list-items-response.vtl"
upsert_resolver "Query" "getBlogPost" "UnistudyBlogPostsDataSource" "resolvers/getBlogPost-request.vtl" "resolvers/response.vtl"
upsert_resolver "Mutation" "createBlogPost" "UnistudyBlogPostsDataSource" "resolvers/createBlogPost-request.vtl" "resolvers/response.vtl"
upsert_resolver "Mutation" "updateBlogPost" "UnistudyBlogPostsDataSource" "resolvers/updateBlogPost-request.vtl" "resolvers/response.vtl"

# SEO
upsert_resolver "Query" "getSeoGlobal" "UnistudySeoGlobalDataSource" "resolvers/getSeoGlobal-request.vtl" "resolvers/response.vtl"
upsert_resolver "Query" "listSeoPages" "UnistudySeoPagesDataSource" "resolvers/listSeoPages-request.vtl" "resolvers/list-items-response.vtl"
upsert_resolver "Mutation" "updateSeoGlobal" "UnistudySeoGlobalDataSource" "resolvers/updateSeoGlobal-request.vtl" "resolvers/response.vtl"
upsert_resolver "Mutation" "upsertSeoPage" "UnistudySeoPagesDataSource" "resolvers/upsertSeoPage-request.vtl" "resolvers/response.vtl"
upsert_resolver "Mutation" "deleteSeoPage" "UnistudySeoPagesDataSource" "resolvers/deleteSeoPage-request.vtl" "resolvers/response.vtl"

# Reminders
upsert_resolver "Query" "getReminderTemplate" "UnistudyReminderTemplateDataSource" "resolvers/getReminderTemplate-request.vtl" "resolvers/response.vtl"
upsert_resolver "Query" "listReminderOverrides" "UnistudyReminderOverridesDataSource" "resolvers/listReminderOverrides-request.vtl" "resolvers/list-items-response.vtl"
upsert_resolver "Mutation" "updateReminderTemplate" "UnistudyReminderTemplateDataSource" "resolvers/updateReminderTemplate-request.vtl" "resolvers/response.vtl"
upsert_resolver "Mutation" "setReminderOverride" "UnistudyReminderOverridesDataSource" "resolvers/setReminderOverride-request.vtl" "resolvers/response.vtl"
upsert_resolver "Mutation" "deleteReminderOverride" "UnistudyReminderOverridesDataSource" "resolvers/deleteReminderOverride-request.vtl" "resolvers/response.vtl"

echo "✅ Resolvers upserted successfully!"
