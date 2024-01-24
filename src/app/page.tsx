import { Search } from "@/components/Search";
import MoviesContainer from "@/components/MoviesContainer";

export default async function Home() {
  return (
    <main className="px-24 py-12">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Search />
      </div>
      <MoviesContainer />
    </main>
  );
}
