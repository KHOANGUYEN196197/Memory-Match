import { create } from 'zustand';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  uid?: string;
  loading?: boolean;
}

interface GameState {
  gridSize: number;
  pokemonList: Pokemon[];
  setGridSize: (size: number) => void;
  setPokemonList: (list: Pokemon[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useGameStore = create<GameState>((set) => ({
  gridSize: 2,
  pokemonList: [],
  setGridSize: (size) => set({ gridSize: size }),
  setPokemonList: (list) => set({ pokemonList: list }),
  loading: false,
  setLoading: (loading) => set({ loading: loading }),
}));