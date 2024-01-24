"use server";

export async function searchMovies(searchTerm: string, page: number) {
  if (searchTerm) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/search/movie?query=${searchTerm}&page=${page}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    return data;
  }
}
