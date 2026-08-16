import { useEffect, useState } from "react";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiX } from "react-icons/fi";

const STORAGE_KEY = "admin_policy_rules";

const defaultPolicies = [
  {
    id: 1,
    policyNumber: "१",
    title: "समाचार प्रकाशन सम्बन्धी नियम",
    description: "समाचार प्रकाशन गर्दा तथ्य र स्रोतको उचित प्रमाणीकरण गर्नुपर्नेछ।",
    category: "समाचार",
  },
  {
    id: 2,
    policyNumber: "२",
    title: "सम्पादकीय नीति",
    description: "सम्पादकीय सामग्री निष्पक्ष, तथ्यपरक र जिम्मेवार हुनुपर्नेछ।",
    category: "सम्पादकीय",
  },
  {
    id: 3,
    policyNumber: "३",
    title: "प्रयोगकर्ता टिप्पणी सम्बन्धी नियम",
    description: "अपमानजनक, घृणास्पद तथा गैरकानुनी टिप्पणीहरू स्वीकार गरिने छैन।",
    category: "प्रयोगकर्ता",
  },
  {
    id: 4,
    policyNumber: "४",
    title: "गोपनीयता नीति",
    description: "प्रयोगकर्ताबाट प्राप्त व्यक्तिगत विवरण सुरक्षित रूपमा व्यवस्थापन गरिनेछ।",
    category: "गोपनीयता",
  },
];

export default function AdminPolicyRule() {
  const [policies, setPolicies] = useState(() => {
    const savedPolicies = localStorage.getItem(STORAGE_KEY);

    return savedPolicies
      ? JSON.parse(savedPolicies)
      : defaultPolicies;
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingPolicy, setEditingPolicy] = useState(null);

  const [formData, setFormData] = useState({
    policyNumber: "",
    title: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(policies));
  }, [policies]);

  // -----------------------------
  // OPEN ADD MODAL
  // -----------------------------
  const handleAddPolicy = () => {
    setEditingPolicy(null);

    setFormData({
      policyNumber: "",
      title: "",
      description: "",
      category: "",
    });

    setShowModal(true);
  };

  // -----------------------------
  // OPEN EDIT MODAL
  // -----------------------------
  const handleEdit = (policy) => {
    setEditingPolicy(policy);

    setFormData({
      policyNumber: policy.policyNumber,
      title: policy.title,
      description: policy.description,
      category: policy.category,
    });

    setShowModal(true);
  };

  // -----------------------------
  // FORM CHANGE
  // -----------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------
  // SAVE POLICY
  // -----------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.policyNumber.trim() ||
      !formData.title.trim() ||
      !formData.description.trim()
    ) {
      alert("कृपया आवश्यक सबै विवरण भर्नुहोस्।");
      return;
    }

    if (editingPolicy) {
      // UPDATE
      setPolicies((prev) =>
        prev.map((policy) =>
          policy.id === editingPolicy.id
            ? {
                ...policy,
                ...formData,
              }
            : policy
        )
      );
    } else {
      // ADD
      const newPolicy = {
        id: Date.now(),
        ...formData,
      };

      setPolicies((prev) => [...prev, newPolicy]);
    }

    setShowModal(false);

    setEditingPolicy(null);

    setFormData({
      policyNumber: "",
      title: "",
      description: "",
      category: "",
    });
  };

  // -----------------------------
  // DELETE POLICY
  // -----------------------------
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "के तपाईं यो नीति/नियम हटाउन चाहनुहुन्छ?"
    );

    if (!confirmDelete) return;

    setPolicies((prev) =>
      prev.filter((policy) => policy.id !== id)
    );
  };

  // -----------------------------
  // SEARCH
  // -----------------------------
  const filteredPolicies = policies.filter((policy) => {
    const search = searchTerm.toLowerCase();

    return (
      policy.policyNumber
        .toLowerCase()
        .includes(search) ||
      policy.title
        .toLowerCase()
        .includes(search) ||
      policy.description
        .toLowerCase()
        .includes(search) ||
      policy.category
        .toLowerCase()
        .includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

          <div>
            <h1 className="text-2xl font-semibold text-gray-800 sm:text-3xl">
              नीति तथा नियम व्यवस्थापन
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              जम्मा {policies.length} नीति तथा नियम
            </p>
          </div>

          <button
            onClick={handleAddPolicy}
            className="flex w-fit items-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            <FiPlus size={18} />
            नयाँ नीति थप्नुहोस्
          </button>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="mb-5">
          <div className="relative w-full sm:max-w-md">

            <FiSearch
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="नीति नं., शीर्षक वा विवरण खोज्नुहोस्..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px]">

              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm text-gray-600">

                  <th className="px-5 py-4 font-medium">
                    नीति नं.
                  </th>

                  <th className="px-5 py-4 font-medium">
                    नीति / नियम
                  </th>

                  <th className="px-5 py-4 font-medium">
                    विवरण
                  </th>

                  <th className="px-5 py-4 font-medium">
                    श्रेणी
                  </th>

                  <th className="px-5 py-4 text-center font-medium">
                    कार्य
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredPolicies.length > 0 ? (
                  filteredPolicies.map((policy) => (

                    <tr
                      key={policy.id}
                      className="border-b border-gray-100 transition hover:bg-gray-50"
                    >

                      {/* POLICY NUMBER */}
                      <td className="px-5 py-4">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 font-medium text-indigo-600">
                          {policy.policyNumber}
                        </span>
                      </td>

                      {/* TITLE */}
                      <td className="max-w-[250px] px-5 py-4">
                        <p className="font-medium text-gray-800">
                          {policy.title}
                        </p>
                      </td>

                      {/* DESCRIPTION */}
                      <td className="max-w-[400px] px-5 py-4">
                        <p className="line-clamp-2 text-sm text-gray-500">
                          {policy.description}
                        </p>
                      </td>

                      {/* CATEGORY */}
                      <td className="px-5 py-4">
                        <span className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                          {policy.category || "सामान्य"}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-4">

                        <div className="flex items-center justify-center gap-4">

                          <button
                            onClick={() => handleEdit(policy)}
                            title="सम्पादन गर्नुहोस्"
                            className="text-gray-500 transition hover:text-indigo-600"
                          >
                            <FiEdit2 size={18} />
                          </button>

                          <button
                            onClick={() => handleDelete(policy.id)}
                            title="हटाउनुहोस्"
                            className="text-red-500 transition hover:text-red-700"
                          >
                            <FiTrash2 size={18} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))
                ) : (

                  <tr>
                    <td
                      colSpan="5"
                      className="px-5 py-12 text-center text-sm text-gray-500"
                    >
                      कुनै नीति वा नियम भेटिएन।
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>
        </div>

        {/* ================= MODAL ================= */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">

              {/* MODAL HEADER */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {editingPolicy
                      ? "नीति सम्पादन गर्नुहोस्"
                      : "नयाँ नीति थप्नुहोस्"}
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    नीति तथा नियमको विवरण भर्नुहोस्
                  </p>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <FiX size={20} />
                </button>

              </div>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5 p-6"
              >

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                  {/* POLICY NUMBER */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      नीति नं.
                    </label>

                    <input
                      type="text"
                      name="policyNumber"
                      value={formData.policyNumber}
                      onChange={handleChange}
                      placeholder="जस्तै: १"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  {/* CATEGORY */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      श्रेणी
                    </label>

                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="जस्तै: सम्पादकीय"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                </div>

                {/* TITLE */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    नीति / नियमको शीर्षक
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="नीति वा नियमको शीर्षक लेख्नुहोस्..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    विवरण
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="नीति वा नियमको विस्तृत विवरण लेख्नुहोस्..."
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                {/* BUTTONS */}
                <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">

                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                  >
                    रद्द गर्नुहोस्
                  </button>

                  <button
                    type="submit"
                    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                  >
                    {editingPolicy
                      ? "परिवर्तन सुरक्षित गर्नुहोस्"
                      : "नीति थप्नुहोस्"}
                  </button>

                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}