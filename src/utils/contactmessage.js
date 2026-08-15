export const getContactMessages = () => {
  return JSON.parse(
    localStorage.getItem("contactMessages") || "[]"
  );
};

export const saveContactMessage = (message) => {
  const messages = getContactMessages();

  const newMessage = {
    id: Date.now(),
    name: message.name,
    email: message.email,
    subject: message.subject,
    message: message.message,
    date: new Date().toLocaleString(),
  };

  messages.push(newMessage);

  localStorage.setItem(
    "contactMessages",
    JSON.stringify(messages)
  );
};

export const deleteContactMessage = (id) => {
  const messages = getContactMessages();

  const updatedMessages = messages.filter(
    (message) => message.id !== id
  );

  localStorage.setItem(
    "contactMessages",
    JSON.stringify(updatedMessages)
  );
};