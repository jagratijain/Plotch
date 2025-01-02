import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PokemonCard from '../components/PokemonCard';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=48');
        const data = await response.json();
        setPokemons(data.results);
        setFilteredPokemons(data.results);
      } catch (error) {
        console.error('Failed to fetch pokemons', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    const results = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPokemons(results);
  }, [search, pokemons]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="Dashboard flex">
        <Sidebar search={search} setSearch={setSearch} />
        <div className="flex-1 max-w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {filteredPokemons.map((pokemon, index) => (
              <PokemonCard key={index} pokemon={pokemon} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;