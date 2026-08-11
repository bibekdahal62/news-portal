import NepaliDate from "nepali-date-converter";
import { useLang } from "../context/LanguageContext";

function DateDisplay() {
  const { lang } = useLang();

  const today = new Date();

  if (lang === "ne") {
    const nepaliDate = new NepaliDate(today);

    return (
      <p className="px-4 mx-4 xl:px-2 xl:mx-0 py-3 text-white font-semibold">
        {nepaliDate.format("ddd, MMMM DD, YYYY", "np")}
      </p>
    );
  }

  return (
    <p className="px-4 mx-4 xl:px-2 xl:mx-0 py-3 text-white font-semibold">
      {today.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })}
    </p>
  );
}

export default DateDisplay;
