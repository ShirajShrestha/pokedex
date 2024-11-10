import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchNextPokemons,
  fetchPokemons,
  setPokemons,
} from "../redux/pokemonSlice";

const Pokemons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pokemonList = useSelector(setPokemons);
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  // Function to fetch individual Pokémon details
  const fetchPokemonDetails = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    }
  };

  const fetchPokemonData = async () => {
    try {
      setIsFetching(true);

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
      );
      const data = await response.json();

      const pokemonResults = [];
      for (const pokemon of data.results) {
        const pokemonDetails = await fetchPokemonDetails(pokemon.url);
        if (pokemonDetails) {
          pokemonResults.push(pokemonDetails);
        }
      }
      if (offset === 0) {
        dispatch(fetchPokemons(pokemonResults));
      } else {
        dispatch(fetchNextPokemons(pokemonResults));
      }
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollY + windowHeight >= documentHeight - 100 && !isFetching) {
      setOffset((prevLimit) => prevLimit + 20);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetching]);

  useEffect(() => {
    fetchPokemonData();
  }, [offset]);

  const viewPokemonDetails = (id) => {
    navigate(`/pokemon/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 lg:p-16 p-8">
      <h1 className="text-5xl font-bold text-center text-yellow-400 mb-8">
        Pokémons
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 lg:mx-20">
        {pokemonList.length > 0 ? (
          pokemonList.map((pokemon) => (
            <div
              key={pokemon.id}
              className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center transition-transform hover:scale-105 border-2 border-blue-400 cursor-pointer"
              onClick={() => viewPokemonDetails(pokemon.id)}
            >
              <img
                className="w-24 h-24 mb-4"
                src={pokemon.sprites.other.home.front_default}
                alt={pokemon.name}
              />
              <p className="capitalize font-semibold text-white">
                {pokemon.name}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-lg text-yellow-400">
            Loading Pokémon...
          </p>
        )}
      </div>
    </div>
  );
};

export default Pokemons;
