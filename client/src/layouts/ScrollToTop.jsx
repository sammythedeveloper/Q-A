import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This tells the browser to jump to the very top (0,0)
    window.scrollTo(0, 0);
  }, [pathname]); // This fires every time the 'pathname' (URL) changes

  return null; // This component doesn't render anything visually
};

export default ScrollToTop;
