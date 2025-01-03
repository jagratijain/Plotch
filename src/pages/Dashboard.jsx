import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import PokemonCard from '../components/PokemonCard';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  const [pokemons, setPokemons] = useState([]); // All Pokémon data
  const [visiblePokemons, setVisiblePokemons] = useState([]); // Pokémon visible in the viewport
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const itemsPerPage = 8; // Number of items to load per scroll

  const observerRef = useRef(null);
  const pageRef = useRef(1); // Track the current page without triggering re-renders

  // Fetch all Pokémon on initial render
  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=200');
        const data = await response.json();
        setPokemons(data.results); // Store all Pokémon data
        setVisiblePokemons(data.results); // Initialize visible Pokémon with all 200 entries
      } catch (error) {
        console.error('Failed to fetch pokemons', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  // Lazy load more Pokémon when scrolling
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const nextPage = pageRef.current + 1;
          const startIndex = (nextPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;

          // Load more Pokémon into visible list
          setVisiblePokemons((prev) => [
            ...prev,
            ...pokemons.slice(startIndex, endIndex),
          ]);

          pageRef.current = nextPage; // Update the page reference
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [pokemons]);

  // Filter Pokémon based on the search query
  useEffect(() => {
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
    setVisiblePokemons(filtered.slice(0, pageRef.current * itemsPerPage));
  }, [search, pokemons]);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar search={search} setSearch={setSearch} />
        <div className="flex-1 overflow-y-auto h-[calc(100vh-64px)]">
          <div className="min-h-[90vh] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {visiblePokemons.map((pokemon, index) => (
              <PokemonCard key={index} pokemon={pokemon} />
            ))}
          </div>
          {loading && <p className="text-center mt-5">Loading...</p>}
          <div ref={observerRef} className="h-10"></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
