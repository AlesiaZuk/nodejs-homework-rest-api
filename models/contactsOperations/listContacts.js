const fs = require("fs").promises;

const filePath = require("./contactsPath");

const listContacts = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
};

module.exports = listContacts;
