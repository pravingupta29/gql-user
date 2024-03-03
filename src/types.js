const { gql } = require("graphql-tag");

const typeDefs = gql`
  #graphql
  # extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  type User @key(fields: "id") {
    id: ID!
    name: String!
    fatherName: String
    email: String!
    addressList: [Address!]!
    phone: String!
  }

  type Address {
    id: ID!
    line1: String!
    line2: String
    pinCode: String!
    userId: String!
  }

  type Query {
    users: [User]
    user(id: ID): User
    addressList(userId: String): [Address!]!
  }

  input AddUserPayload {
    name: String!
    email: String!
    phone: String!
  }

  input AddAddressPayload {
    line1: String!
    line2: String
    pinCode: String!
    userId: String!
  }

  type Mutation {
    addUser(user: AddUserPayload): User!
    addAddress(address: AddAddressPayload): Address
  }
`;

module.exports = typeDefs;
