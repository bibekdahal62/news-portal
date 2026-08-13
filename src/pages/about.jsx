import { Link } from "react-router-dom";
import { FiCheckCircle, FiShield, FiUsers } from "react-icons/fi";

const values = [
  {
    icon: <FiCheckCircle size={22} />,
    title: "शुद्धतामा प्राथमिकता",
    text: "प्रकाशन गर्नुअघि प्रत्येक समाचार प्रमाणित गरिन्छ, ताकि तपाईंले पढेको कुरामा विश्वास गर्न सक्नुहोस्।",
  },
  {
    icon: <FiShield size={22} />,
    title: "स्वतन्त्र आवाज",
    text: "हामी कुनै पनि राजनीतिक वा व्यापारिक प्रभाव बिना, तथ्यमा आधारित भएर मात्र समाचार प्रकाशित गर्छौं।",
  },
  {
    icon: <FiUsers size={22} />,
    title: "सामुदायिक सरोकार",
    text: "विराटनगरमा जरा गाडेको हाम्रो टिम स्थानीय कथा र मानिसहरूसँग नजिक रहन्छ।",
  },
];

function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className=" container mt-10 mx-auto rounded-lg bg-(--primary-color) text-white">
        <div className="container mx-auto px-6 py-16 text-center lg:px-10">
          <h1 className="text-3xl font-bold sm:text-4xl">हाम्रो बारेमा</h1>
          <p className="mx-auto mt-4 max-w-2xl text-md leading-relaxed text-indigo-100 sm:text-base">
            समाचार पोर्टल विराटनगर, नेपालमा आधारित एउटा स्वतन्त्र सञ्चार माध्यम
            हो, जसले दैनिक रूपमा नेपाली र अंग्रेजी दुवै भाषामा समाचार प्रकाशित
            गर्दछ।
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-3xl rounded-md border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            हाम्रो लक्ष्य
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            हामी विश्वास गर्छौं कि हरेक नेपालीले छिटो, सही र निष्पक्ष समाचार
            पाउनुपर्छ। स्थानीय घटनादेखि राष्ट्रिय राजनीति, खेलकुद र
            अन्तर्राष्ट्रिय मामिलासम्म, हाम्रो टिम तपाईंसम्म महत्त्वपूर्ण समाचार
            पुर्‍याउन निरन्तर खटिरहेको छ।
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-6 pb-16 lg:px-10">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {values.map((value, index) => (
            <div
              key={index}
              className="rounded-md border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--primary-color)/10 text-(--primary-color)">
                {value.icon}
              </div>
              <h3 className="mt-4 text-base font-bold text-gray-900">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 pb-16 text-center lg:px-10">
        <p className="text-sm text-gray-600 sm:text-base">
          कुनै समाचार वा प्रतिक्रिया छ? हामीलाई सुन्न मन छ।
        </p>
        <Link
          to="/contact"
          className="mt-4 inline-block rounded-full bg-(--primary-color) px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          सम्पर्क गर्नुहोस्
        </Link>
      </section>
    </main>
  );
}

export default AboutPage;
