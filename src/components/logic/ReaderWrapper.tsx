"use client";
import { useState } from "react";
import { ReactReader } from "react-reader";
import Rendition from "epubjs/types/rendition";
import { useRenditionStore } from "@/stores/RenditionState";
import { useIsMobileStore, useViewPortCheck } from "@/stores/MobileState";

const ReaderWrapper = () => {
  useViewPortCheck();

  // For testing purposes currently
  const epubUrl = "/epubs/oreimov1Fixed.epub";
  const [location, setLocation] = useState<string | number>(0);
  const setRendition = useRenditionStore((state) => state.setRendition);
  const isMobile = useIsMobileStore((state) => state.isMobile);

  const handleRendition = (rendition: Rendition) => {
    setRendition(rendition);
  };

  return (
    <div className="w-full h-full md:w-2/4 md:h-full">
      <ReactReader
        url={epubUrl}
        location={location}
        locationChanged={(epubcfi: string) => setLocation(epubcfi)}
        getRendition={handleRendition}
        swipeable={isMobile}
      />
    </div>
  );
};

export default ReaderWrapper;
