import { useEffect, useState } from "react";

export function useZoom(min = 0.1, max = 2) {
  const [zoomFactor, setZoomFactor] = useState(1);
  const INCREMENT = 0.005;
  // const [CTRLisDown,setCTRLisDOWN]=useState(false);
  function zoom(e) {
    e.preventDefault();

    if (e.shiftKey) {
      const scrollDist = e.deltaY;

      setZoomFactor((prev) => {
        const newVal = prev - scrollDist * INCREMENT;
        if (newVal < max && newVal > min) {
          return newVal;
        } else {
          return prev;
        }
      });
    }
  }
  useEffect(() => {
    window.addEventListener("wheel", zoom);
    return () => {
      window.removeEventListener("wheel", zoom);
    };
  }, []);
  return zoomFactor;
}
