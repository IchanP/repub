import { create } from "zustand";
import Rendition from "epubjs/types/rendition";

interface RenditionStore {
  rendition: Rendition | null;
  setRendition: (rendition: Rendition) => void;
}

export const useRenditionStore = create<RenditionStore>((set) => ({
  rendition: null as Rendition | null,
  setRendition: (rendition: Rendition) => set({ rendition }),
}));
