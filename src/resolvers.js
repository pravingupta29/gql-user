const users = require("../data/user.data");
const addresses = require("../data/address.data");
const { addUser, fetchUserByID } = require("./libs/user");
const { addAddress } = require("./libs/address");

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => {
      return fetchUserByID(id);
    },
    addressList: (_, { userId }) => {
      return addresses.filter((address) => address.userId === userId);
    },
  },
  Mutation: {
    addUser: (_, { user }) => {
      return addUser(user);
    },
    addAddress: (_, { address }) => {
      return addAddress(address);
    },
  },
  User: {
    __resolveReference(userRepresentation) {
      return fetchUserByID(userRepresentation.id);
    },
    addressList: ({ id }) => {
      return addresses.filter((address) => address.userId === id);
    },
  },
};

module.exports = resolvers;
