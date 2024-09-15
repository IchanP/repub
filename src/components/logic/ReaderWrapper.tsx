"use client";
import { useState } from "react";
import { ReactReader } from "react-reader";

const ReaderWrapper = () => {
  // For testing purposes currently
  const epubUrl = "/epubs/oreimov1.epub"; //process.env.TEST_EPUB_URL as string;
  const [location, setLocation] = useState<string | number>(0);
  console.log(epubUrl);
  return (
    <div className="w-2/4 h-full">
      <ReactReader
        url={epubUrl}
        location={location}
        locationChanged={(epubcfi: string) => setLocation(epubcfi)}
        epubOptions={{ spread: "none" }}
      />
    </div>
  );
};

export default ReaderWrapper;
