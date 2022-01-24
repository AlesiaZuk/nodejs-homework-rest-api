const listContacts = require("./listContacts");
const writeContacts = require("./writeContacts");

const updateContact = async ({ name, email, phone, id }) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((item) => item.id === id);
  if (contactIndex === -1) {
    return null;
  }
  contacts[contactIndex] = { name, email, phone, id };
  await writeContacts(contacts);
  return contacts[contactIndex];
};

module.exports = updateContact;
