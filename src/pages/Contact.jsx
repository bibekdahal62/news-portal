import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { useState } from "react";

import { saveContactMessage } from "../utils/contactmessage";

const contactInfo = [
  {
    icon: <FiPhone size={22} />,
    title: "फोन",
    text: "+९७७-९७००००००००",
  },
  {
    icon: <FiMail size={22} />,
    title: "इमेल",
    text: "news@newsite.com.np",
  },
  {
    icon: <FiMapPin size={22} />,
    title: "ठेगाना",
    text: "विराटनगर, नेपाल",
  },
];

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    saveContactMessage(formData);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className=" container mx-auto mt-10 rounded-lg bg-(--primary-color) text-white">
        <div className="container mx-auto px-6 py-16 text-center lg:px-10">
          <h1 className="text-3xl font-bold sm:text-4xl">सम्पर्क गर्नुहोस्</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-indigo-100 sm:text-base">
            तपाईंको प्रश्न, सुझाव वा समाचार हामीसँग साझा गर्नुहोस्। हामी चाँडै
            नै तपाईंलाई सम्पर्क गर्नेछौं।
          </p>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="container mx-auto px-6 py-12 lg:px-10">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="rounded-md border border-gray-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-(--primary-color)/10 text-(--primary-color)">
                {info.icon}
              </div>
              <h3 className="mt-4 text-base font-bold text-gray-900">
                {info.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed break-all text-gray-600">
                {info.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section className="container mx-auto px-6 pb-16 lg:px-10">
        <div className="mx-auto max-w-2xl rounded-md border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            सन्देश पठाउनुहोस्
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-semibold text-gray-700"
                >
                  पूरा नाम
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="तपाईंको नाम"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm outline-none focus:border-(--primary-color)"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-semibold text-gray-700"
                >
                  इमेल
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm outline-none focus:border-(--primary-color)"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-1 block text-sm font-semibold text-gray-700"
              >
                विषय
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="विषय लेख्नुहोस्"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm outline-none focus:border-(--primary-color)"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1 block text-sm font-semibold text-gray-700"
              >
                सन्देश
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="तपाईंको सन्देश यहाँ लेख्नुहोस्..."
                value={formData.message}
                onChange={handleChange}
                className="w-full resize-none rounded-md border border-gray-300 px-4 py-2 text-sm outline-none focus:border-(--primary-color)"
              />
            </div>

            <button
              type="submit"
              className="mt-2 self-start rounded-full bg-(--primary-color) px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              पठाउनुहोस्
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
