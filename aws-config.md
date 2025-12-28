# AWS Backend Configuration

## AppSync API Details

**API ID**: `v43hc6cuejflhfpncunun5tefy`
**GraphQL Endpoint**: `https://2tzhjw5r4jggnlr7g3rxyuwzf4.appsync-api.us-east-1.amazonaws.com/graphql`
**Realtime Endpoint**: `wss://2tzhjw5r4jggnlr7g3rxyuwzf4.appsync-realtime-api.us-east-1.amazonaws.com/graphql`
**Region**: `us-east-1`
**Authentication**: AWS_IAM (will add Cognito later)

## DynamoDB Tables

1. **UnistudyClients**
   - PK: `phone`
   - GSI: `createdAt-index`
   - Status: ACTIVE

2. **UnistudyOrders**
   - PK: `orderId`
   - GSI: `clientPhone-index`
   - Status: ACTIVE

3. **UnistudyPlans**
   - PK: `planId`
   - Status: ACTIVE

## Next Steps

1. Configure data sources (link AppSync → DynamoDB)
2. Create resolvers for mutations/queries
3. Setup Cognito User Pool
4. Update frontend with GraphQL endpoint
