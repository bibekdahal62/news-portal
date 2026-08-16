import { createContext, useContext, useState } from "react";

const ContactMessageContext = createContext();

// Messages submitted through the public /contact form, held in React state
// only for this session — nothing is written to localStorage. Refreshing
// the page (or opening the site in a new tab) clears them, same as the
// News/Ads/Video data. A real deployment would send these to a backend
// (email, database, or a form service) instead.
export function ContactMessageProvider({ children }) {
  const [messages, setMessages] = useState([]);

  function addMessage({ name, email, subject, message }) {
    const newMessage = {
      id: Date.now(),
      name,
      email,
      subject,
      message,
      date: new Date().toLocaleString(),
    };
    setMessages((prev) => [newMessage, ...prev]);
    return newMessage;
  }

  function deleteMessage(id) {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <ContactMessageContext.Provider
      value={{ messages, addMessage, deleteMessage }}
    >
      {children}
    </ContactMessageContext.Provider>
  );
}

export function useContactMessages() {
  return useContext(ContactMessageContext);
}
