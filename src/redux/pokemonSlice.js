import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemons: [],
};

const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    fetchPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
    fetchNextPokemons: (state, action) => {
      state.pokemons = [...state.pokemons, ...action.payload];
    },
  },
});

export default pokemonSlice.reducer;
export const { fetchPokemons, fetchNextPokemons } = pokemonSlice.actions;
export const setPokemons = (state) => state.pokemons.pokemons;
