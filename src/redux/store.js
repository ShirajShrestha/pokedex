import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";
import pokemonDetailsReducer from "./pokemonDetailSlice";

const store = configureStore({
  reducer: {
    pokemons: pokemonReducer,
    pokemon: pokemonDetailsReducer,
  },
});

export default store;
