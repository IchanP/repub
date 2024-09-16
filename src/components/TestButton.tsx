"use client";
import { useRenditionStore } from "@/stores/RenditionState";
import Rendition from "epubjs/types/rendition";

const TestButton = () => {
  const rendition = useRenditionStore((state) => state.rendition) as Rendition;
  const dualPage = false;
  const handleClick = () => {
    console.log(rendition.book.navigation.toc[6]);
    rendition.display(rendition.book.navigation.toc[6].href);
  };
  return (
    <div className="w-full flex col items-center justify-center">
      <button onClick={handleClick}>this is a test</button>
    </div>
  );
};

export default TestButton;
