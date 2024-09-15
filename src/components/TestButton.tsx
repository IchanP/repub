"use client";
import { useRenditionStore } from "@/stores/RenditionState";

const TestButton = () => {
  const rendition = useRenditionStore((state) => state.rendition);
  let dualPage = false;
  const handleClick = () => {
    rendition?.spread(dualPage ? "always" : "none");
    dualPage = !dualPage;
  };
  return (
    <div className="w-full flex col items-center justify-center">
      <button onClick={handleClick}>this is a test</button>
    </div>
  );
};

export default TestButton;
