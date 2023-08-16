const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { generate } = require("shortid");

const users = require("../../data/user.data");
const writeFile = promisify(fs.writeFile);

const saveUser = async (allUsers = users) => {
  const fileName = path.join(__dirname, "../../data/user.data.json");
  const fileContents = JSON.stringify(allUsers, null, 2);

  try {
    await writeFile(fileName, fileContents);
    const userCount = allUsers.length;
    console.log(`${userCount} user saved`);
  } catch (error) {
    console.error("Error saving user");
    console.error(error);
  }
};

const addUser = async (user) => {
  const { email, name, phone } = user;

  const newUser = {
    id: generate(),
    email,
    name,
    phone,
  };
  await saveUser([...users, newUser]);
  return newUser;
};

const fetchUserByID = (userId) => {
  return users.find((user) => user.id === userId);
}

module.exports = {
  addUser,
  fetchUserByID
};
