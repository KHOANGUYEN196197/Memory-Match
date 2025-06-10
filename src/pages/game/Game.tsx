import { useEffect, useState } from 'react';
import { useGameStore, type Pokemon } from '../../store/gameStore/GameStore';
import Board from '../../components/Board';
import { getPokemonList } from '../../utils/fetchPokemon';
import Spinner from '../../components/Spinner';

export default function Game() {
  const gridSize = useGameStore((state) => state.gridSize);
  const setPokemonList = useGameStore((state) => state.setPokemonList);
   const setLoading = useGameStore((state) => state.setLoading);
  const loading = useGameStore((state) => state.loading);

  const numPairs = (gridSize * gridSize) / 2;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const pokemons = await getPokemonList(numPairs);
      const paired: Pokemon[] = [...pokemons, ...pokemons].map((p, i) => ({
        ...p,
        uid: `${i}-${p.id}`,
      }));
      const shuffled = paired.sort(() => 0.5 - Math.random());
      setPokemonList(shuffled);
      setLoading(false);
    };

    fetchData();
  }, [gridSize, setPokemonList, numPairs]);

  if (loading) return <div className='flex justify-center h-[90vh] items-center'> <Spinner /></div>;

  return <Board/>;
}
