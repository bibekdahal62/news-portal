/**
 * Red banner for errors, green banner for success — every single admin
 * form has one or both of these. Folding them into one component means
 * we only tweak the padding/border/color combo in one place if the design
 * ever changes.
 */
function FormAlert({ type = "error", children }) {
  if (!children) return null;

  const styles =
    type === "success"
      ? "text-green-700 bg-green-50 border-green-100"
      : "text-red-600 bg-red-50 border-red-100";

  return (
    <p className={`text-sm rounded-md px-3 py-2 border ${styles}`}>
      {children}
    </p>
  );
}

export default FormAlert;
