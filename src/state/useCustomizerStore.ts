import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ColorConfig {
  base: string;
  accent: string;
  sole: string;
}

export interface Design {
  id: string;
  name: string;
  colors: ColorConfig;
  createdAt: number;
}

export type ModelType = "shoe" | "cube" | "sphere" | "custom";

interface CustomizerState {
  colors: ColorConfig;
  designs: Design[];
  currentModel: ModelType;
  customModelUrl: string | null;

  setColor: (part: keyof ColorConfig, value: string) => void;
  setColors: (colors: ColorConfig) => void;
  setModel: (model: ModelType) => void;
  setCustomModel: (url: string) => void;
  saveDesign: (name: string) => void;
  loadDesign: (id: string) => void;
  deleteDesign: (id: string) => void;
}

const DEFAULT_COLORS: ColorConfig = {
  base: "#ffffff",
  accent: "#06b6d4",
  sole: "#000000",
};

export const useCustomizerStore = create<CustomizerState>()(
  persist(
    (set, get) => ({
      colors: DEFAULT_COLORS,
      designs: [],
      currentModel: "shoe",
      customModelUrl: null,

      setColor: (part, value) =>
        set((state) => ({
          colors: { ...state.colors, [part]: value },
        })),

      setColors: (colors) => set({ colors }),

      setModel: (model) => set({ currentModel: model }),

      setCustomModel: (url) => set({ currentModel: "custom", customModelUrl: url }),

      saveDesign: (name) => {
        const { colors } = get();
        const newDesign: Design = {
          id: crypto.randomUUID(),
          name,
          colors: { ...colors },
          createdAt: Date.now(),
        };
        set((state) => ({
          designs: [...state.designs, newDesign],
        }));
      },

      loadDesign: (id) => {
        const { designs } = get();
        const design = designs.find((d) => d.id === id);
        if (design) {
          set({ colors: { ...design.colors } });
        }
      },

      deleteDesign: (id) =>
        set((state) => ({
          designs: state.designs.filter((d) => d.id !== id),
        })),
    }),
    {
      name: "customizer-storage",
      partialize: (state) => ({ designs: state.designs }), // Only persist designs, or maybe persist current colors too?
      // User asked: "On app start, hydrate designs from localStorage."
      // "On designs array change, write back to localStorage."
      // "Provide initial default colors"
      // So maybe we don't persist current colors, only designs.
      // But usually it's nice to persist current state too.
      // The spec says: "On app start, hydrate designs from localStorage."
      // It doesn't explicitly say hydrate current colors.
      // I'll stick to persisting designs only to match spec strictly, or maybe both.
      // "On designs array change, write back to localStorage." -> implies designs are the main thing.
      // I'll persist designs only for now to be safe, or I can persist everything.
      // Actually, standard behavior is usually persist everything.
      // But let's follow spec: "On app start, hydrate designs from localStorage."
      // I'll persist designs.
    }
  )
);
