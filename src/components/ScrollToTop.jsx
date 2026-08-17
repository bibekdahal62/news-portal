import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router doesn't reset scroll position on navigation by default -
// without this, clicking a news card while scrolled down the homepage
// lands on the detail page still scrolled down. Mounted once inside
// <BrowserRouter>, above <Routes>, so it re-runs on every path change.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
