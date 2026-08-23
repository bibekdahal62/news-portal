/**
 * A single checkbox with its label next to it, wrapped so the whole line
 * is clickable. Every form has a handful of these (active, enabled,
 * show-in-nav, show-on-home...) — same three classNames copy-pasted every
 * time, now just one component.
 */
function CheckboxField({ label, checked, onChange, size = "sm" }) {
  return (
    <label
      className={`flex items-center gap-2 ${
        size === "xs" ? "text-xs" : "text-sm"
      } text-gray-600 cursor-pointer`}
    >
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}

export default CheckboxField;
