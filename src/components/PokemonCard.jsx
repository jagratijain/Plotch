import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PokemonCard({ pokemon }) {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const response = await axios.get(pokemon.url);
      setPokemonDetails(response.data);
    };

    fetchPokemonDetails();
  }, [pokemon.url]);

  if (!pokemonDetails) return <p className="text-center">Loading Pokémon details...</p>;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="p-4">
        <h3 className="text-lg font-bold text-center capitalize">{pokemonDetails.name}</h3>
        <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} className="mx-auto w-24 h-24"/>
      </div>
      <div className="px-4 pb-4">
        <p className="text-sm text-gray-600">Type: {pokemonDetails.types.map((type) => type.type.name).join(', ')}</p>
        <p className="text-sm text-gray-600">Height: {pokemonDetails.height * 10} cm</p>
        <p className="text-sm text-gray-600">Weight: {pokemonDetails.weight / 10} kg</p>
      </div>
    </div>
  );
}

export default PokemonCard;
