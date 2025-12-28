/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createClient = /* GraphQL */ `
  mutation CreateClient($input: CreateClientInput!) {
    createClient(input: $input) {
      phone
      name
      email
      createdAt
      notes
    }
  }
`;

export const updateClient = /* GraphQL */ `
  mutation UpdateClient($phone: ID!, $input: UpdateClientInput!) {
    updateClient(phone: $phone, input: $input) {
      phone
      name
      email
      createdAt
      notes
    }
  }
`;

export const createOrder = /* GraphQL */ `
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
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

export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder($orderId: ID!, $input: UpdateOrderInput!) {
    updateOrder(orderId: $orderId, input: $input) {
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

export const createPlan = /* GraphQL */ `
  mutation CreatePlan($input: CreatePlanInput!) {
    createPlan(input: $input) {
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
