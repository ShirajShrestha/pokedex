import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemon: [],
};
const pokemonDetailSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    fetchPokemonDetail: (state, action) => {
      state.pokemon = action.payload;
    },
  },
});

export default pokemonDetailSlice.reducer;
export const { fetchPokemonDetail } = pokemonDetailSlice.actions;
export const setPokemonDetail = (state) => state.pokemon.pokemon;
