import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  searchTerm: string;
  setSearchTerm: (search: string) => void;
};

export const useSearchStore = create<Store>()(
  persist(
    (set) => ({
      searchTerm: "",
      setSearchTerm: (searchTerm: string) => set({ searchTerm }),
    }),
    {
      name: "search-storage",
    }
  )
);
