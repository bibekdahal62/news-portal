import { useEffect, useState } from "react";
import { FiFileText, FiChevronDown, FiChevronUp } from "react-icons/fi";

const STORAGE_KEY = "admin_policy_rules";

const defaultPolicies = [
  {
    id: 1,
    policyNumber: "१",
    title: "समाचार प्रकाशन सम्बन्धी नियम",
    description:
      "समाचार प्रकाशन गर्दा तथ्य र स्रोतको उचित प्रमाणीकरण गर्नुपर्नेछ।",
    category: "समाचार",
  },
  {
    id: 2,
    policyNumber: "२",
    title: "सम्पादकीय नीति",
    description:
      "सम्पादकीय सामग्री निष्पक्ष, तथ्यपरक र जिम्मेवार हुनुपर्नेछ।",
    category: "सम्पादकीय",
  },
  {
    id: 3,
    policyNumber: "३",
    title: "प्रयोगकर्ता टिप्पणी सम्बन्धी नियम",
    description:
      "अपमानजनक, घृणास्पद तथा गैरकानुनी टिप्पणीहरू स्वीकार गरिने छैन।",
    category: "प्रयोगकर्ता",
  },
  {
    id: 4,
    policyNumber: "४",
    title: "गोपनीयता नीति",
    description:
      "प्रयोगकर्ताबाट प्राप्त व्यक्तिगत विवरण सुरक्षित रूपमा व्यवस्थापन गरिनेछ।",
    category: "गोपनीयता",
  },
];

export default function PolicyRule() {
  const [policies, setPolicies] = useState([]);
  const [openPolicy, setOpenPolicy] = useState(null);

  // Load policies from localStorage
  const loadPolicies = () => {
    const savedPolicies = localStorage.getItem(STORAGE_KEY);

    if (savedPolicies) {
      setPolicies(JSON.parse(savedPolicies));
    } else {
      setPolicies(defaultPolicies);
    }
  };

  useEffect(() => {
    loadPolicies();

    // Update page if localStorage changes
    const handleStorageChange = () => {
      loadPolicies();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const togglePolicy = (id) => {
    setOpenPolicy((current) => (current === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* ================= HEADER ================= */}
        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <FiFileText size={26} />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            नीति तथा नियम
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            हाम्रो वेबसाइटसँग सम्बन्धित नीति तथा नियमहरू
          </p>

        </div>

        {/* ================= POLICY LIST ================= */}
        <div className="space-y-4">

          {policies.length > 0 ? (
            policies.map((policy) => {
              const isOpen = openPolicy === policy.id;

              return (
                <div
                  key={policy.id}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                >

                  {/* POLICY HEADER */}
                  <button
                    onClick={() => togglePolicy(policy.id)}
                    className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
                  >

                    {/* NUMBER */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-lg font-semibold text-white">
                      {policy.policyNumber}
                    </div>

                    {/* TITLE */}
                    <div className="min-w-0 flex-1">

                      <div className="mb-1 flex flex-wrap items-center gap-2">

                        <h2 className="text-base font-semibold text-gray-800 sm:text-lg">
                          {policy.title}
                        </h2>

                        {policy.category && (
                          <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                            {policy.category}
                          </span>
                        )}

                      </div>

                      {!isOpen && (
                        <p className="line-clamp-1 text-sm text-gray-500">
                          {policy.description}
                        </p>
                      )}

                    </div>

                    {/* ARROW */}
                    <div className="shrink-0 text-gray-400">

                      {isOpen ? (
                        <FiChevronUp size={21} />
                      ) : (
                        <FiChevronDown size={21} />
                      )}

                    </div>

                  </button>

                  {/* POLICY DESCRIPTION */}
                  {isOpen && (
                    <div className="border-t border-gray-100 bg-gray-50 px-5 py-5 sm:px-6">

                      <div className="rounded-lg border border-gray-200 bg-white p-5">

                        <p className="text-sm leading-7 text-gray-600 sm:text-base">
                          {policy.description}
                        </p>

                      </div>

                    </div>
                  )}

                </div>
              );
            })
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white py-12 text-center">
              <FiFileText
                size={35}
                className="mx-auto mb-3 text-gray-300"
              />

              <p className="text-gray-500">
                हाल कुनै नीति तथा नियम उपलब्ध छैन।
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}