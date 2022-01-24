const fs = require("fs").promises;

const filePath = require("./contactsPath");

const writeContacts = async (contacts) => {
  await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
};

module.exports = writeContacts;
