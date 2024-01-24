"use client";

import { Movie } from "@/types/movie";
import { searchMovies } from "@/lib/actions";
import { useMoviesStore } from "@/store/movies";
import { useSearchStore } from "@/store/search";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import type { UseInfiniteQueryOptions } from "@tanstack/react-query";
import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import MovieCard from "./MovieCard";
import LoadMoreButton from "./LoadMoreButton";
import { MoviesSkeleton } from "./Skeletons";

export default function MoviesContainer() {
  const currentPage = useMoviesStore((state) => state.currentPage);
  const movies = useMoviesStore((state) => state.movies);
  const setMovies = useMoviesStore((state) => state.setMovies);
  const loading = useMoviesStore((state) => state.loading);
  const setLoading = useMoviesStore((state) => state.setLoading);
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const { ref, inView } = useInView();
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ["movies", searchTerm, currentPage],
    queryFn: ({ pageParam }) => searchMovies(searchTerm, pageParam),
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => {
      if (firstPage.page === 1) return undefined;
      return firstPage.page - 1;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page === lastPage.total_pages) return undefined;
      return lastPage.page + 1;
    },
  });

  useEffect(() => {
    if (searchTerm) {
      searchMovies(searchTerm, 1).then((movies) => {
        setMovies(movies.results);
        setLoading(false);
      });
    }
  }, [searchTerm, setLoading, setMovies]);

  useEffect(() => {
    if (data) {
      const pages = data.pages.flat();
      const combinedResultsArrays = pages.reduce((acc, currentPage) => {
        return acc.concat(currentPage.results);
      }, []);
      setMovies(combinedResultsArrays);
    }
  }, [data, setMovies]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  if (loading && movies.length === 0) {
    return (
      <div className="max-w-6xl mx-auto my-4 flex flex-col gap-2">
        <h1 className="text-4xl font-semibold text-center">
          Por favor ingrese un término de búsqueda
        </h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto my-4 flex flex-col gap-2">
        <ul className="flex flex-row flex-wrap gap-10">
          <MoviesSkeleton />
        </ul>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-4 flex flex-col gap-2">
      <h1 className="text-4xl font-semibold">Peliculas encontradas</h1>
      <ul className="flex flex-row flex-wrap gap-10">
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </ul>
      <div className="h-2" ref={ref}></div>

      {isFetchingNextPage && <MoviesSkeleton />}
    </div>
  );
}
