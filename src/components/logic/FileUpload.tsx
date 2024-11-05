"use client";

import { useState } from "react";
import axios from "axios";
import ProgressBar from "../ProgressBar";

const FileUpload = () => {
  const MAX_FILE_SIZE = 90_000_000; // 90mb

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files ? event.target.files[0] : null;
    if (file && file.type !== "application/epub+zip") {
      setSelectedFile(null);
      setErrorMessage("Only files in ePub format are allowed.");
    } else if (file && file.size > MAX_FILE_SIZE) {
      setSelectedFile(null);
      setErrorMessage("Only files under 90mb are allowed.");
    } else {
      setSelectedFile(file);
      setErrorMessage(null);
    }
  };

  const uploadBook = () => {
    if (selectedFile) {
      const fileData = new FormData();
      fileData.append("epubBook", selectedFile);
      try {
        axios.post("api/upload", fileData, {
          onUploadProgress: (progressEvent) => {
            const total = progressEvent.total ? progressEvent.total : 0;
            const current = progressEvent.loaded;
            const percentCompleted = Math.round((current / total) * 100);
            setProgress(percentCompleted);
          },
        });
      } catch (err: unknown) {
        // TODO have a logger that logs this.
        setErrorMessage("Something went wrong while uploading.");
      }
    } else {
      setErrorMessage("Invalid format or too large file.");
    }
  };

  return (
    <div className="w-full">
      <div className="absolute w-3/4 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-lightSecondary dark:bg-darkSecondary p-2 rounded-md md:w-2/4 md:text-center">
        <label
          htmlFor="epub-file"
          className="cursor-pointer md:flex md:flex-col md:items-center"
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
          <p className="text-xs mt-1 pl-1">Epub only!</p>
        </label>
        <div className="w-full text-center">
          <button
            onClick={uploadBook}
            className="bg-lightPrimary dark:bg-darkPrimary rounded-md px-3 py-2 mt-2 hover:bg-lightHover dark:hover:bg-darkHover font-bold shadow-lg"
            data-testid="file-submit"
          >
            UPLOAD
          </button>
        </div>
        <ProgressBar progress={progress} />
      </div>
      {errorMessage && (
        <div className="bg-[#570505] absolute bottom-0 w-full py-2 pt-5">
          <div
            className="absolute right-5 top-0 font-bold shadow-lg cursor-pointer select-none text-gray-400 text-lg"
            onClick={() => setErrorMessage(null)}
          >
            X
          </div>
          <p className="text-center text-sm md:text-base">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
