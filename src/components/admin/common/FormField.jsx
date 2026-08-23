/**
 * A label sitting on top of an input. This exact pair (label + styled
 * input) is retyped in basically every admin form — category name, ad
 * link, dates, passwords, etc. — so rather than hand-writing the same
 * className soup each time, forms can just render <FormField />.
 *
 * Anything an <input> accepts can be passed through via ...rest
 * (type, value, onChange, placeholder, required, minLength, ...).
 */
function FormField({ label, hint, className = "", ...rest }) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        // base look stays fixed; callers can only add to it (e.g. letter
        // spacing on the reset-code field), not accidentally replace it
        className={`w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color) ${className}`}
        {...rest}
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

export default FormField;
