import { usePrivacy } from "../context/PrivacyContext";

// These paragraphs ship with the site by default. The admin can add more
// sections on top of these (through /admin/privacy), but cannot edit or
// remove the defaults from the UI — they're the baseline policy text.
const DEFAULT_SECTIONS = [
  {
    heading: "हामीले सङ्कलन गर्ने जानकारी",
    body: "तपाईंले हाम्रो साइटमा फारम भर्दा (जस्तै सम्पर्क फारम), हामी तपाईंको नाम, इमेल ठेगाना, र तपाईंले पठाउनुभएको सन्देश सङ्कलन गर्न सक्छौं। यसबाहेक, साइट प्रयोग गर्दा ब्राउजर र यन्त्र सम्बन्धी सामान्य प्राविधिक जानकारी पनि स्वतः सङ्कलन हुन सक्छ।",
  },
  {
    heading: "जानकारीको प्रयोग",
    body: "सङ्कलन गरिएको जानकारी तपाईंको प्रश्नको जवाफ दिन, सेवा सुधार गर्न, र आवश्यक परेमा तपाईंलाई सम्पर्क गर्न प्रयोग गरिन्छ। हामी तपाईंको जानकारी तेस्रो पक्षलाई बेच्दैनौं।",
  },
  {
    heading: "कुकीज",
    body: "हाम्रो साइटले तपाईंको अनुभव सुधार गर्न कुकीज प्रयोग गर्न सक्छ। तपाईं आफ्नो ब्राउजर सेटिङबाट कुकीज नियन्त्रण वा असक्षम गर्न सक्नुहुन्छ।",
  },
  {
    heading: "तपाईंको अधिकार",
    body: "तपाईंले हामीसँग भएको आफ्नो व्यक्तिगत जानकारी हेर्न, सच्याउन वा हटाउन अनुरोध गर्न सक्नुहुन्छ। यसका लागि हाम्रो सम्पर्क पृष्ठमार्फत हामीलाई सम्पर्क गर्नुहोस्।",
  },
  {
    heading: "नीतिमा परिवर्तन",
    body: "हामी यो गोपनीयता नीति समय-समयमा अद्यावधिक गर्न सक्छौं। कुनै महत्त्वपूर्ण परिवर्तन भएमा यसै पृष्ठमार्फत जानकारी गराइनेछ।",
  },
];

function PrivacyPage() {
  const { sections } = usePrivacy();

  return (
    <main className="min-h-screen mx-6">
      <section className="container mx-auto mt-12 rounded-lg bg-(--primary-color) text-white">
        <div className="container mx-auto px-6 py-16 text-center lg:px-10">
          <h1 className="text-3xl font-bold sm:text-4xl">गोपनीयता नीति</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-indigo-100 sm:text-base">
            तपाईंको गोपनीयता हाम्रो लागि महत्त्वपूर्ण छ। यो पृष्ठले हामीले
            तपाईंको जानकारी कसरी सङ्कलन र प्रयोग गर्छौं भन्ने बताउँछ।
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-3xl flex flex-col gap-8">
          {DEFAULT_SECTIONS.map((section) => (
            <div key={section.heading}>
              <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                {section.heading}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base whitespace-pre-line">
                {section.body}
              </p>
            </div>
          ))}

          {sections.length > 0 && (
            <div className="border-t border-gray-100 pt-8 flex flex-col gap-8">
              {sections.map((section) => (
                <div key={section.id}>
                  <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                    {section.heading}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base whitespace-pre-line">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default PrivacyPage;
