import type { Pokemon } from '../store/gameStore/GameStore';

export async function getPokemonList(count: number): Promise<Pokemon[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${count}`);
  const data = await res.json();

  const details = await Promise.all(
    data.results.map((p: { url: string }) =>
      fetch(p.url).then((r) => r.json())
    )
  );

  return details.map((p: any) => ({
    id: p.id,
    name: p.name,
    image: p.sprites.front_default,
  }));
}
