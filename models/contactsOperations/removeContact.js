const listContacts = require("./listContacts");
const writeContacts = require("./writeContacts");

const removeContact = async (id) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((item) => item.id === String(id));
  if (contactIndex === -1) {
    return null;
  }
  const deleteContact = contacts.splice(contactIndex, 1);
  await writeContacts(contacts);
  return deleteContact;
};

module.exports = removeContact;
