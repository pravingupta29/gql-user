const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { generate } = require("shortid");

const addresses = require("../../data/address.data");
const writeFile = promisify(fs.writeFile);

const saveAddress = async (allAddress = addresses) => {
  const fileName = path.join(__dirname, "../../data/address.data.json");
  const fileContents = JSON.stringify(allAddress, null, 2);

  try {
    await writeFile(fileName, fileContents);
    const addressCount = allAddress.length;
    console.log(`${addressCount} address saved`);
  } catch (error) {
    console.error("Error saving address");
    console.error(error);
  }
};

const addAddress = async (user) => {
  const { line1, line2 = null, pinCode, userId } = user;

  const newAddress = {
    id: generate(),
    userId,
    line1,
    line2,
    pinCode,
  };
  await saveAddress([...addresses, newAddress]);
  return newAddress;
};

module.exports = {
  addAddress,
};
