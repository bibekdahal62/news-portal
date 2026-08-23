import { useState } from "react";
import { MdCircle, MdMailOutline } from "react-icons/md";
import { useContactMessages } from "../../context/ContactMessageContext";
import ContactMessageModal from "../../components/admin/ContactMessageModal";

function AdminContactMessage() {
  const { messages, deleteMessage, unreadCount } = useContactMessages();
  const [filter, setFilter] = useState("all"); // "all" | "unread"
  const [selectedId, setSelectedId] = useState(null);

  const visibleMessages =
    filter === "unread" ? messages.filter((m) => !m.read) : messages;

  const selectedMessage = messages.find((m) => m.id === selectedId) || null;

  const handleDelete = (e, id) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "के तपाईं यो सन्देश हटाउन चाहनुहुन्छ?",
    );

    if (!confirmDelete) return;

    deleteMessage(id);
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">सम्पर्क सन्देश</h1>
          <p className="text-gray-500 mt-1">
            प्रयोगकर्ताहरूबाट प्राप्त सन्देशहरू
          </p>
        </div>

        <div className="inline-flex rounded-md border border-gray-200 bg-white p-1 text-sm">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded cursor-pointer transition-colors ${
              filter === "all"
                ? "bg-(--primary-color) text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            सबै ({messages.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-3 py-1.5 rounded cursor-pointer transition-colors ${
              filter === "unread"
                ? "bg-(--primary-color) text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            नपढिएको ({unreadCount})
          </button>
        </div>
      </div>

      {visibleMessages.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <MdMailOutline size={32} className="mx-auto text-gray-300 mb-2" />
          <p className="text-gray-500">
            {filter === "unread"
              ? "कुनै नपढिएको सन्देश छैन।"
              : "अहिलेसम्म कुनै सन्देश प्राप्त भएको छैन।"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100 overflow-hidden">
          {visibleMessages.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedId(item.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedId(item.id);
                }
              }}
              className={`w-full text-left px-5 py-4 flex items-start gap-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                !item.read ? "bg-blue-50/40" : ""
              }`}
            >
              <span
                className="mt-1.5 shrink-0"
                title={item.read ? "पढिएको" : "नपढिएको"}
              >
                <MdCircle
                  size={9}
                  className={item.read ? "text-gray-200" : "text-blue-500"}
                />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={`text-sm truncate ${
                      item.read
                        ? "font-medium text-gray-700"
                        : "font-semibold text-gray-900"
                    }`}
                  >
                    {item.name}{" "}
                    <span className="font-normal text-gray-400">
                      · {item.email}
                    </span>
                  </p>
                  <span className="text-xs text-gray-400 shrink-0">
                    {item.date}
                  </span>
                </div>
                <p
                  className={`text-sm mt-0.5 truncate ${
                    item.read ? "text-gray-500" : "text-gray-800"
                  }`}
                >
                  {item.subject}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                  {item.message}
                </p>
              </div>

              <button
                onClick={(e) => handleDelete(e, item.id)}
                className="shrink-0 px-3 py-1.5 rounded-md bg-red-500 text-white text-xs font-medium hover:bg-red-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <ContactMessageModal
        message={selectedMessage}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}

export default AdminContactMessage;
