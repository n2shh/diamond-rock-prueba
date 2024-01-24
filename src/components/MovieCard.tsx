import { Movie } from "@/types/movie";
import { Star } from "lucide-react";
import Image from "next/image";

export default function MovieCard(movie: Movie) {
  const roundedVoteAverage = Math.round(movie.vote_average * 10) / 10;
  const truncatedTitle =
    movie.title.length > 20
      ? movie.title.substring(0, 20) + "..."
      : movie.title;
  const yearReleased = new Date(movie.release_date).getFullYear();

  return (
    <div className="max-w-64 max-h-[550px]">
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        width={256}
        height={381}
        alt={movie.title}
        className="rounded-xl shadow-xl w-full h-[381px] object-cover mb-2"
      />
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl text-primary-foreground font-medium">
            {truncatedTitle}
          </h1>
          <p className="text-secondary-foreground">{yearReleased}</p>
        </div>
        <div className="text-secondary-foreground text-lg flex flex-row items-center gap-1">
          <Star
            className="inline-block w-4 h-4 text-primary-foreground"
            color="yellow"
            fill="yellow"
          />
          <div>
            {roundedVoteAverage}
            <span className="text-xs">/10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
