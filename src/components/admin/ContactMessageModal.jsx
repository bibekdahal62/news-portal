import { useEffect } from "react";
import { MdClose, MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";
import { useContactMessages } from "../../context/ContactMessageContext";

function ContactMessageModal({ message, onClose }) {
  const { markAsRead, toggleRead } = useContactMessages();

  // Opening the detail view is what "reading" the message means — mark it
  // read as soon as it's shown, same as opening an email.
  useEffect(() => {
    if (message && !message.read) {
      markAsRead(message.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message?.id]);

  if (!message) return null;

  const ToggleIcon = message.read ? MdMarkEmailUnread : MdMarkEmailRead;
  const toggleLabel = message.read
    ? "नपढिएको चिन्ह लगाउनुहोस्"
    : "पढिएको चिन्ह लगाउनुहोस्";

  return (
    <div
      translate="no"
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 py-8"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-full overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-900">
              सन्देश विवरण
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded ${
                message.read
                  ? "bg-gray-100 text-gray-500"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {message.read ? "पढिएको" : "नपढिएको"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-gray-100 text-gray-500 cursor-pointer"
            aria-label="बन्द गर्नुहोस्"
          >
            <MdClose size={18} />
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {message.name}
              </h2>
              <p className="text-sm text-gray-500">{message.email}</p>
            </div>

            <button
              onClick={() => toggleRead(message.id)}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 cursor-pointer"
            >
              <ToggleIcon size={15} />
              <span>{toggleLabel}</span>
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-700">विषय</p>
            <p className="text-sm text-gray-600 mt-1">{message.subject}</p>
          </div>

          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-700">सन्देश</p>
            <p className="text-sm text-gray-600 mt-1 leading-6 whitespace-pre-wrap">
              {message.message}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-400">{message.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactMessageModal;
