import { useState } from "react";
import { MdContentCopy, MdCheck, MdShare } from "react-icons/md";
import { useLang } from "../context/LanguageContext";

// Single universal share button for a news article's detail page.
// Uses the native OS share sheet (Web Share API) where available,
// and falls back to copying the link to the clipboard otherwise.
function ShareButtons({ url, title }) {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);

  const shareUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = title || "";

  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  const label = lang === "en" ? "Share" : "सेयर गर्नुहोस्";
  const copiedLabel = lang === "en" ? "Link copied!" : "लिङ्क कपी भयो!";

  const handleShare = async () => {
    if (canNativeShare) {
      try {
        await navigator.share({ title: shareTitle, url: shareUrl });
      } catch {
        // User cancelled the share sheet — nothing to do.
      }
      return;
    }

    // Fallback for browsers without the Web Share API (most desktop browsers).
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fail silently.
    }
  };

  return (
    <div className="mb-10">
      <button
        type="button"
        onClick={handleShare}
        aria-label={label}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-(--primary-color) text-white text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        {copied ? <MdCheck size={17} /> : <MdShare size={16} />}
        {copied ? copiedLabel : label}
      </button>
    </div>
  );
}

export default ShareButtons;
