import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import PokemonCard from '../components/PokemonCard';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  const [pokemons, setPokemons] = useState([]);
  const [visiblePokemons, setVisiblePokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  
  const gridRef = useRef(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=200');
        const data = await response.json();
        setPokemons(data.results);
      } catch (error) {
        console.error('Failed to fetch pokemons', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPokemons = pokemons.slice(0, endIndex);
    setVisiblePokemons(paginatedPokemons);
  }, [page, pokemons]);

  useEffect(() => {
    const grid = gridRef.current;
    
    const handleScroll = () => {
      if (!grid) return;
      
      const scrolledToBottom = 
        Math.ceil(grid.scrollTop + grid.clientHeight) >= 
        (grid.scrollHeight - 100);
        
      if (scrolledToBottom) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    grid.addEventListener('scroll', handleScroll);
    return () => grid?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
    setVisiblePokemons(filtered.slice(0, page * itemsPerPage));
  }, [search, page, pokemons]);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar search={search} setSearch={setSearch} />
        <div 
          ref={gridRef}
          className="flex-1 overflow-y-auto h-[calc(100vh-64px)]"
        >
          <div className="min-h-[90vh] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {visiblePokemons.map((pokemon, index) => (
              <PokemonCard key={index} pokemon={pokemon} />
            ))}
          </div>
          {loading && <p className="text-center mt-5">Loading...</p>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;