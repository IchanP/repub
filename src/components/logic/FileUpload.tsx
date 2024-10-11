"use client";

import { useState } from "react";

const FileUpload = () => {
  const MAX_FILE_SIZE = 90_000_000; // 90mb
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>();
  const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files ? event.target.files[0] : null;
    console.log(file);
    if (file && file.type !== "application/epub+zip") {
      setSelectedFile(null);
      setErrorMessage("Only files in ePub format are allowed.");
    } else if (file && file.size > MAX_FILE_SIZE) {
      setSelectedFile(null);
      setErrorMessage("Only files under 90mb are allowed.");
    } else {
      setSelectedFile(file);
      setErrorMessage("");
    }
  };

  return (
    <div className="w-full">
      <div className="absolute w-3/4 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 dark:bg-darkSecondary p-2 rounded-md md:w-2/4 md:text-center">
        <label
          htmlFor="epub-file"
          className="md:flex md:flex-col md:items-center"
        >
          <p className="text-center mb-1">Select book to upload</p>
          <input
            className="h-1/8 max-w-full cursor-pointer block text-sm text-gray-900 border bg-lightPrimary border-gray-300 rounded-lg cursor-pointer 
          bg-gray-50 focus:outline-none dark:bg-darkPrimary dark:text-white dark:border-gray-600 dark:placeholder-gray-400 py-1 pl-1 md:w-3/4"
            id="epub-file"
            type="file"
            accept=".epub"
            data-testid="file-upload"
            onChange={fileChange}
          />
        </label>
        <p className="text-xs mt-1 pl-1">Epub only!</p>
      </div>
      {errorMessage !== "" && (
        <div className="bg-[#570505] absolute bottom-0 w-full py-2">
          <p className="text-center">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
