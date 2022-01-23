const { v4 } = require("uuid");

const listContacts = require("./listContacts");
const writeContacts = require("./writeContacts");

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { ...body, id: v4() };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
};

module.exports = addContact;
