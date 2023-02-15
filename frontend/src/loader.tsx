import { useEffect, useState } from "react";
import { attachLoadingCallback } from "./routes";

let interval = 50;
let slowness = 1;

export const Loader: React.FC = () => {
  const [loading, setLoading] = useState(false);
  attachLoadingCallback(setLoading);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    let delta = 0;

    if (!loading) {
      setProgress(1);
      return;
    }

    const timer = setInterval(() => {
      setProgress(1 - slowness / (Math.sqrt(delta) + slowness));
      delta += interval;
    }, interval);

    return () => clearInterval(timer);
  }, [loading]);

  return (
    <div className="fixed top-0 left-0 right-0 h-1">
      <div
        style={{
          width: `${progress * 100}%`,
          transition:
            "width .1s ease, " + `opacity ${loading ? ".01s" : ".5s"} ease`,
          zIndex: 99999, // TODO: doesn't appear to do anything
          opacity: loading ? 1 : 0,
        }}
        className="bg-accent h-full relative"
      />
    </div>
  );
};
