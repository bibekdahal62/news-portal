/**
 * Small "प्रकाशित / ड्राफ्ट" pill. News, Videos and Gallery lists all show
 * one of these, just styled slightly differently for table rows vs cards —
 * `variant` handles that difference instead of duplicating the component.
 */
function StatusBadge({ published, variant = "pill" }) {
  if (variant === "table") {
    return published ? (
      <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded">
        प्रकाशित
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-500 border border-gray-200 px-2 py-1 rounded">
        ड्राफ्ट
      </span>
    );
  }

  // "card" variant: sits absolutely-positioned over a thumbnail image.
  return (
    <span
      className={`text-[11px] font-medium px-2 py-0.5 rounded ${
        published
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-gray-100 text-gray-500 border border-gray-200"
      }`}
    >
      {published ? "प्रकाशित" : "ड्राफ्ट"}
    </span>
  );
}

export default StatusBadge;
