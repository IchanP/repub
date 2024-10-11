"use client";
const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="h-7 mt-2">
      {progress > 0 && progress < 100 && (
        <div className="h-full relative bg-lightPrimary font-bold text-black text-lg justify-center">
          <div
            className="h-full bg-green-500 rounded-md"
            style={{
              width: `${progress}%`,
            }}
          ></div>
          <p className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {progress}%
          </p>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
