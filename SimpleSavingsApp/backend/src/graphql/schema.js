// backend/src/graphql/schema.js

export const typeDefs = `
  type UserAuthResponse {
    token: String!
  }

  type Savings {
    id: ID!
    balance: Float!
    targetGoal: Float!
  }

  type Query {
    getMySavings: Savings
  }

  type Mutation {
    signupUser(username: String!, password: String!, role: String!): UserAuthResponse
    loginUser(username: String!, password: String!): UserAuthResponse
    depositMoney(amount: Float!): Savings
    setSavingsGoal(target: Float!): Savings
  }
`;
