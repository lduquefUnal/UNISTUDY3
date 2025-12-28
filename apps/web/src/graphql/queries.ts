/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listClients = /* GraphQL */ `
  query ListClients($limit: Int, $nextToken: String) {
    listClients(limit: $limit, nextToken: $nextToken) {
      items {
        phone
        name
        email
        createdAt
        notes
      }
      nextToken
    }
  }
`;

export const getClient = /* GraphQL */ `
  query GetClient($phone: ID!) {
    getClient(phone: $phone) {
      phone
      name
      email
      createdAt
      notes
    }
  }
`;

export const listOrders = /* GraphQL */ `
  query ListOrders($limit: Int, $nextToken: String) {
    listOrders(limit: $limit, nextToken: $nextToken) {
      items {
        orderId
        clientPhone
        planId
        status
        amount
        createdAt
        expiresAt
        reference
      }
      nextToken
    }
  }
`;

export const getOrder = /* GraphQL */ `
  query GetOrder($orderId: ID!) {
    getOrder(orderId: $orderId) {
      orderId
      clientPhone
      planId
      status
      amount
      createdAt
      expiresAt
      reference
    }
  }
`;

export const getOrdersByClient = /* GraphQL */ `
  query GetOrdersByClient($clientPhone: String!) {
    getOrdersByClient(clientPhone: $clientPhone) {
      orderId
      clientPhone
      planId
      status
      amount
      createdAt
      expiresAt
      reference
    }
  }
`;

export const listPlans = /* GraphQL */ `
  query ListPlans {
    listPlans {
      planId
      name
      description
      monthlyPrice
      annualPrice
      features
      category
      isActive
      priority
    }
  }
`;

export const getPlan = /* GraphQL */ `
  query GetPlan($planId: ID!) {
    getPlan(planId: $planId) {
      planId
      name
      description
      monthlyPrice
      annualPrice
      features
      category
      isActive
      priority
    }
  }
`;
