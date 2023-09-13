import React, { useState, useEffect } from "react";
import { Main } from "./styled";
import PokeCard from "../PokeCard/PokeCard";
import { getId } from "@/utils/getId";

type Pokemon = {
  url: string;
  name: string;
};

type Props = {
  favorites: number[];
  pokemonList: Pokemon[];
  showFavorites: boolean;
};

const FavoritePokemonButton: React.FC<Props> = ({
  favorites,
  pokemonList,
  showFavorites,
}) => {
  const [filteredFavorites, setFilteredFavorites] = useState<Pokemon[]>([]);

  useEffect(() => {
    if (showFavorites) {
      setFilteredFavorites(
        pokemonList.filter((pokemon) => favorites.includes(getId(pokemon.url)))
      );
    } else {
      setFilteredFavorites([]);
    }
  }, [showFavorites, favorites, pokemonList]);

  console.log(">>>", favorites);
  return (
    <Main>
      {showFavorites &&
        filteredFavorites.length > 0 &&
        filteredFavorites.map((pokemon) => (
          <PokeCard
            key={pokemon.name}
            name={pokemon.name}
            id={getId(pokemon.url)}
          />
        ))}
    </Main>
  );
};

export default FavoritePokemonButton;
