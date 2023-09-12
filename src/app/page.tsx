/* eslint-disable @next/next/no-img-element */
"use client";
import { PokeApi } from "@/api/api";
import React, { useEffect, useMemo, useState } from "react";
import { Main } from "./styled";
import PokeCard from "@/components/PokeCard/PokeCard";

type List = {
  name: string;
  url: string;
};

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    PokeApi.get(`pokemon?limit=10&offset=${page}`).then((response) => {
      setPokemonList(response.data.results);
    });
  }, [page]);

  function nextPage() {
    setPage(page + 10);
  }

  function previousPage() {
    if (page > 0) {
      setPage(page - 10);
    }
  }

  function getId(url: string) {
    const partes = url.split("/");
    const ultimoElemento = partes[partes.length - 2];
    const numero = parseInt(ultimoElemento, 10);

    if (!isNaN(numero)) {
      return numero;
    } else {
      return -1;
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

  return (
    <>
      <div className="pokeContainer">
        <img
          className="centered-img"
          alt="pokemon-logo"
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
        />
        <input
          className="searchPokemon"
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Econtrar Pokémon na página" //apenas o pokemon disponível na pagina
        />
        <Main>
          {filteredData.length ? (
            filteredData?.map((pokemon: List) => {
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
          <h3>{page / 10 + 1}</h3>
          <button onClick={() => nextPage()}>Próxima</button>
        </div>
      </div>
    </>
  );
}
