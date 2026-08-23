/**
 * Labeled <select>. Sibling of FormField — kept separate rather than
 * cramming both into one component, since a select needs its children
 * (the <option> list) rather than a value/onChange-only API.
 */
function SelectField({ label, children, ...rest }) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
        {...rest}
      >
        {children}
      </select>
    </div>
  );
}

export default SelectField;
