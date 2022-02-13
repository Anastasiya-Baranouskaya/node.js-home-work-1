const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");
const contactsPath = require("./db/contacts.json"); //array of contacts//object

const readContent = async () => {
  const content = await fs.readFile(
    path.join(__dirname, "./db/contacts.json"),
    "utf8"
  ); //string
  const result = JSON.parse(content);
  return result;
};

async function listContacts() {
  return await readContent();
}

async function getContactById(contactId) {
  const contacts = await readContent();
  const [contact] = contacts.filter((c) => c.id === contactId);
  return contact ? contact : null;
}

async function removeContact(contactId) {
  const contacts = await readContent();
  const idx = contacts.findIndex((c) => c.id === contactId);
  if (idx === 1) {
    return null;
  }
  const newContact = contacts.filter((_, index) => index !== idx);
  await fs.writeFile(
    path.join(__dirname, "./db/contacts.json"),
    JSON.stringify(newContact, null, 2)
  );
  return contacts[idx];
}

async function addContact(name, email, phone) {
  const contacts = await readContent();
  const newContact = { id: randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "./db/contacts.json"),
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
}

module.exports = {
  readContent,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
