"use client";
import { useMoviesStore } from "@/store/movies";
import { searchMovies } from "@/lib/actions";

export default function LoadMoreButton() {
  const currentPage = useMoviesStore((state) => state.currentPage);
  const setCurrentPage = useMoviesStore((state) => state.setCurrentPage);

  return (
    <main>
      <button
        onClick={() => {
          setCurrentPage(currentPage + 1);
          // searchMovies();
        }}
      >
        Load More
      </button>
    </main>
  );
}
