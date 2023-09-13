/* eslint-disable @next/next/no-img-element */
"use client";
import { PokeApi } from "@/api/api";
import { useEffect, useMemo, useState } from "react";
import { Main, ShowFavoritesButton } from "./styled";
import PokeCard from "@/components/PokeCard/PokeCard";
import { getId } from "@/utils/getId";
import FavoritePokemonButton from "@/components/showFav/showFav";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type List = {
  name: string;
  url: string;
};

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await PokeApi.get("pokemon?limit=100");
        setPokemonList(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar a lista de Pokémon", error);
      }
    }

    fetchData();
  }, []);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(pokemonList.length / itemsPerPage);

  function nextPage() {
    if (page + 1 < totalPages) {
      setPage(page + 1);
    }
  }

  function previousPage() {
    if (page > 0) {
      setPage(page - 1);
    }
  }

  const filteredData = useMemo(() => {
    if (!searchQuery.length) return pokemonList;

    const queryToCompare = searchQuery
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");

    return pokemonList.filter((item: List) =>
      item.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .includes(queryToCompare)
    );
  }, [searchQuery, pokemonList]);

  const startIdx = page * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const displayedPokemon = filteredData.slice(startIdx, endIdx);

  console.log("???", favorites);

  return (
    <>
      <div className="pokeContainer">
        <img
          className="centered-img"
          alt="pokemon-logo"
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
        />
        <div className="searchContainer">
          <input
            className="searchPokemon"
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Procurar Pokémon"
          />
          <span className="searchIcon">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
        <div className="showFav">
          <ShowFavoritesButton onClick={() => setShowFavorites(!showFavorites)}>
            {showFavorites ? "Mostrar Todos" : "Mostrar Favoritos"}
          </ShowFavoritesButton>
        </div>
        <Main>
          {showFavorites ? (
            <FavoritePokemonButton
              favorites={favorites}
              pokemonList={displayedPokemon}
              showFavorites={showFavorites}
            />
          ) : displayedPokemon.length ? (
            displayedPokemon?.map((pokemon: List) => {
              console.log(pokemon.url);
              return (
                <PokeCard
                  key={pokemon.name}
                  name={pokemon.name}
                  id={getId(pokemon.url)}
                />
              );
            })
          ) : (
            <h1>Pokemón não encontrado</h1>
          )}
        </Main>
        <div className="pagination">
          <button onClick={() => previousPage()}>Voltar</button>
          <p>{page + 1}</p>
          <span> de {totalPages} </span>
          <button onClick={() => nextPage()}>Próxima</button>
        </div>
      </div>
    </>
  );
}
