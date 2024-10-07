import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchPokemonDetail,
  setPokemonDetail,
} from "../redux/pokemonDetailSlice";

const PokemonDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector(setPokemonDetail);
  const fetchPokemonData = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      dispatch(fetchPokemonDetail(data));
    } catch (error) {
      console.error("Failed to fetch Pokemon data:", error);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, [id]);

  if (!details) {
    return (
      <div className="text-center text-white">Loading Pokémon details...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-5xl md:text-6xl font-bold text-center mb-8 capitalize">
        {details.name}
      </h1>

      <div className="flex flex-col md:flex-row justify-center items-center">
        {/* Left section */}
        <div className="md:w-1/4 space-y-4 mb-8 md:mb-0 md:self-center md:mt-40 ">
          <p className="text-lg">
            <strong>Height:</strong> {details.height / 10} m
          </p>
          <p className="text-lg">
            <strong>Weight:</strong> {details.weight / 10} kg
          </p>
          <p className="text-lg">
            <strong>Type:</strong>{" "}
            {details.types?.map((i) => (
              <span key={i.type.name} className="capitalize">
                <span className="border border-white rounded-3xl px-2 py-1 mr-2">
                  {i.type.name}
                </span>
              </span>
            ))}
          </p>
          <p className="text-lg">
            <strong>Abilities:</strong>{" "}
            {details.abilities?.map((i) => (
              <span key={i.ability.name} className="capitalize">
                {i.ability.name}
                {i.is_hidden ? " (Hidden)" : ""}
                {", "}
              </span>
            ))}
          </p>
        </div>

        {/* Center section: Image */}
        <div className="md:w-1/3 text-center mb-8 md:mb-0">
          {details.sprites?.other?.home?.front_default && (
            <img
              src={details.sprites.other.home.front_default}
              alt={details.name}
              className="w-64 h-64 md:w-96 md:h-96 mx-auto"
            />
          )}
        </div>

        {/* Right section: Stats  */}
        <div className="md:w-1/4 space-y-4 hidden md:block md:self-center md:mt-16 ">
          <h3 className="text-lg font-bold mb-4">Stats</h3>
          {details.stats?.map((statInfo) => (
            <div key={statInfo.stat.name} className="capitalize mb-4">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{statInfo.stat.name}</span>
                <span className="font-medium">{statInfo.base_stat}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: `${(statInfo.base_stat / 255) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="block md:hidden mt-8 mx-8 self-center">
        <h3 className="text-lg font-bold mb-4">Stats</h3>
        <div className="space-y-4">
          {details.stats?.map((statInfo) => (
            <div key={statInfo.stat.name} className="capitalize mb-4">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{statInfo.stat.name}</span>
                <span className="font-medium">{statInfo.base_stat}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: `${(statInfo.base_stat / 255) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
