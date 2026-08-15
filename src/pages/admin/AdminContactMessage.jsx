import { useEffect, useState } from "react";
import { getContactMessages, deleteContactMessage } from "./contactmessage";

function AdminContactMessage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(getContactMessages());
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "के तपाईं यो सन्देश हटाउन चाहनुहुन्छ?",
    );

    if (!confirmDelete) return;

    deleteContactMessage(id);

    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id),
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">सम्पर्क सन्देश</h1>

        <p className="text-gray-500 mt-1">
          प्रयोगकर्ताहरूबाट प्राप्त सन्देशहरू
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500">
            अहिलेसम्म कुनै सन्देश प्राप्त भएको छैन।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {messages.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h2>

                  <p className="text-sm text-gray-500">{item.email}</p>
                </div>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 rounded-md bg-red-500 text-white text-xs font-medium hover:bg-red-600"
                >
                  Delete
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700">विषय</p>

                <p className="text-sm text-gray-600 mt-1">{item.subject}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700">सन्देश</p>

                <p className="text-sm text-gray-600 mt-1 leading-6">
                  {item.message}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminContactMessage;
