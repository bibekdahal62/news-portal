const Trending = () => {
  const trendingItems = [
    {
      id: 1,
      title: "१०० वर्षपछि पर्सि स्पेनबाट देखिँदै दुर्लभ पूर्ण सूर्यग्रहण",
      href: "#",
    },
    {
      id: 2,
      title:
        "स्थानीय संस्कृति र प्रकृतिको अध्ययनसँगै हाइकिङ तथा अवलोकनमा सिद्धार्थका विद्यार्थी",
      href: "#",
    },
    {
      id: 3,
      title: "यस वर्ष साउनको अन्तिम सोमबार 'सोमप्रदोष व्रत'को संयोग",
      href: "#",
    },
    {
      id: 4,
      title: "सुन्दरहरैंचामा मनाइयो विश्व आदिवासी दिवस",
      href: "#",
    },
    {
      id: 5,
      title: "कोसी साहित्य कला परिषदको अध्यक्षमा पुनः केशु किरी",
      href: "#",
    },
  ];

  return (
    <aside className="sticky top-0 mt-6 self-start w-full z-50">
      <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden w-full">
        {/* Header */}
        <div className="px-4 pt-4 pb-2">
          <h2 className="flex items-center gap-2 text-blue-800 font-bold text-lg">
            <span>📈</span>
            <span>ट्रेन्डिङमा</span>
          </h2>

          <div className="mt-2 border-t-2 border-red-500 w-full" />
        </div>

        {/* List */}
        <ul className="divide-y divide-gray-100">
          {trendingItems.map((item) => (
            <li key={item.id} className="px-4 py-3">
              <a href={item.href} className="flex items-start gap-3 group">
                <span className="text-red-600 font-bold text-sm w-4 shrink-0">
                  {item.id}
                </span>

                <span className="text-sm text-gray-800 leading-snug group-hover:text-blue-700 transition-colors">
                  {item.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Trending;
