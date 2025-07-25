import { useQuery } from "@tanstack/react-query";
import "./index.css";
import { useState } from "react";

type Pokemon = {
  name: string;
  url: string;
};

type PokemonList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};

function App() {
  const [clicks, SetClicks] = useState<number>(1);

  const { data } = useQuery<PokemonList>({
    queryKey: ["pokemons"],
    queryFn: async () => {
      const result = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1000000"
      );
      return result.json();
    },
  });
    const handleClick = () => {
    SetClicks((x) => x +1);
   };
 
  return (
    <div className="ml-1 pt-5 ">
      <div className="ml-5 pt-5">
        <ul className="list-disc">
          {data?.results
            .slice(0, clicks*5)
            .map((pokemon: Pokemon, index: number) => {
              return <li key={index}>{pokemon.name}</li>;
            })}
        </ul>
      </div>

    {data ? ((!(clicks*5 >= data.results.length)) ? (
        <div className="flex flex-col">
          <span>
            Displaying {clicks * 5} of {data?.count} results
          </span>
          <button
            className="border rounded-xl p-1 w-30 cursor-pointer"
            onClick={handleClick}
          >
            Load More
          </button>
        </div>
      ) : (
        <span>No more pokemons to display </span>
      )):<span>loading...</span>}
    </div>
  );
}

export default App;
