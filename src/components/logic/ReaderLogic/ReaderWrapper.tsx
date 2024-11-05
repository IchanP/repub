"use client";

import ReaderSettingsContainer from "@/components/logic/ReaderLogic/ReaderSettingsContainer";
import { useState } from "react";
const ReaderWrapper = () => {
  const [displaySettings, setDisplaySettings] = useState(true);

  return (
    <div className="w-full h-full">
      {displaySettings && (
        <div className="absolute w-full right-0">
          <ReaderSettingsContainer />
        </div>
      )}
      <div
        className="w-full h-full bg-[#27415c]"
        onClick={() => setDisplaySettings(!displaySettings)}
      >
        {/* TODO set a hold detection to open the display settings. */}
      </div>
    </div>
  );
};

export default ReaderWrapper;
