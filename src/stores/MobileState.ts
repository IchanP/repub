import { useEffect } from "react";
import { create } from "zustand";

interface MobileStore {
  isMobile: boolean;
  setIsMobile: () => void;
}

export const useIsMobileStore = create<MobileStore>((set) => ({
  isMobile: false,
  setIsMobile: () => set({ isMobile: window.innerWidth <= 640 }),
}));

export const useViewPortCheck = () => {
  if (typeof window === "undefined") return; // Prevent running in a non-browser environment

  const setIsMoible = useIsMobileStore((state) => state.setIsMobile);
  useEffect(() => {
    const handleResize = () => {
      setIsMoible();
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMoible]);
};
