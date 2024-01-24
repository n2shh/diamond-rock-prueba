import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Movie } from "../types/movie";

type Store = {
  loading: boolean;
  movies: Movie[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setMovies: (movies: Movie[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useMoviesStore = create<Store>()(
  persist(
    (set) => ({
      loading: true,
      movies: [],
      currentPage: 1,
      setCurrentPage: (page: number) => set({ currentPage: page }),
      setMovies: (movies: Movie[]) => set({ movies }),
      setLoading: (loading: boolean) => set({ loading }),
    }),
    {
      name: "movies-storage",
    }
  )
);
