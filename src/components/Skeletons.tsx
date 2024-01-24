function MovieCardSkeleton() {
  return (
    <li className="max-w-64 max-h-[550px] flex flex-col gap-2">
      <div className="w-[254px] h-[381px] bg-gray-100 rounded-md"></div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <div className="w-32 h-4 bg-gray-100 rounded-md"></div>
          <div className="w-32 h-2 bg-gray-100 rounded-md"></div>
        </div>
        <div className="text-secondary-foreground text-lg flex flex-row items-center gap-1">
          <div>
            <div className="w-8 h-4 bg-gray-100 rounded-md"></div>
          </div>
        </div>
      </div>
    </li>
  );
}

export function MoviesSkeleton() {
  return (
    <main>
      <ul className="flex flex-row flex-wrap gap-10 animate-pulse">
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
      </ul>
    </main>
  );
}
