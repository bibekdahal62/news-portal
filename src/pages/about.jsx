import { Link } from "react-router-dom";
import { FiCheckCircle, FiShield, FiUsers } from "react-icons/fi";
import { useLang } from "../context/LanguageContext";

function AboutPage() {
  const { t } = useLang();

  const values = [
    {
      icon: <FiCheckCircle size={22} />,
      title: t.aboutValue1Title,
      text: t.aboutValue1Text,
    },
    {
      icon: <FiShield size={22} />,
      title: t.aboutValue2Title,
      text: t.aboutValue2Text,
    },
    {
      icon: <FiUsers size={22} />,
      title: t.aboutValue3Title,
      text: t.aboutValue3Text,
    },
  ];

  return (
    <main className="min-h-screen mx-6">
      {/* Hero */}
      <section className=" container mt-12 mx-auto rounded-lg bg-(--primary-color) text-white">
        <div className="container mx-auto px-6 py-16 text-center lg:px-10">
          <h1 className="text-3xl font-bold sm:text-4xl">{t.aboutHeroTitle}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-md leading-relaxed text-indigo-100 sm:text-base">
            {t.aboutHeroText}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-3xl rounded-md border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            {t.aboutMissionTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            {t.aboutMissionText}
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
        <p className="text-sm text-gray-600 sm:text-base">{t.aboutCtaText}</p>
        <Link
          to="/contact"
          className="mt-4 inline-block rounded-full bg-(--primary-color) px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          {t.aboutCtaButton}
        </Link>
      </section>
    </main>
  );
}

export default AboutPage;
