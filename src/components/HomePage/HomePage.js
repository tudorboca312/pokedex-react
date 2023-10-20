import React from "react";
import "./HomePage.css";
import Navigation from "../Navigation/Navigation";
import Categories from "../CategoriesComponent/Categories";
import List from "../List/List";
import Pokemon from "../Pokemon/Pokemon";
import { useEffect, useState } from "react";

function HomePage() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsDetails, setPokemonsDetails] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchState, setSearchState] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [orderStrenght, setOrderStrength] = useState(false);
  const [orderHeight, setOrderHeight] = useState(false);
  const [orderWeight, setOrderWeight] = useState(false);
  const [typeFilter, setTypeFilter] = useState("");

  const changeTypeFilter = (newType) => {
    if (typeFilter === newType) {
      setTypeFilter(""); // Clear the filter if the same type is clicked again
    } else {
      setTypeFilter(newType);
    }
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=300"
      );
      const data = await response.json();
      setPokemons(data.results);
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const detailPromises = pokemons.map(async (pokemon) => {
        const pokemonResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`
        );
        const pokemonData = await pokemonResponse.json();

        const typePromises = pokemonData.types.map(async (type) => {
          const typeResponse = await fetch(type.type.url);
          const typeData = await typeResponse.json();
          return typeData.damage_relations;
        });

        const speciesResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}/`
        );
        const speciesData = await speciesResponse.json();

        const flavorTextEntry = speciesData.flavor_text_entries.find(
          (entry) =>
            entry.language.name === "en" && entry.version.name === "red"
        );

        const description = flavorTextEntry ? flavorTextEntry.flavor_text : "";

        const damageRelations = await Promise.all(typePromises);

        return {
          ...pokemonData,
          damage_relations: damageRelations,
          description: description,
        };
      });

      let details = await Promise.all(detailPromises);

      if (typeFilter !== "") {
        details = details.filter((pokemon) =>
          pokemon.types.some((type) => type.type.name === typeFilter)
        );
      }
      if (orderStrenght) {
        const sortedDetails = details.sort(
          (a, b) => b.base_experience - a.base_experience
        );
        setPokemonsDetails(sortedDetails);
      } else if (orderHeight) {
        const sortedHeight = details.sort((a, b) => b.height - a.height);
        setPokemonsDetails(sortedHeight);
      } else if (orderWeight) {
        const sortedWeight = details.sort((a, b) => b.weight - a.weight);
        setPokemonsDetails(sortedWeight);
      } else {
        setPokemonsDetails(details);
      }
    };

    if (pokemons.length > 0) {
      fetchPokemonDetails();
    }
  }, [pokemons, orderStrenght, orderHeight, orderWeight, typeFilter]);

  const fetchSearch = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`
      );
      const data = await response.json();

      const typePromises = data.types.map(async (type) => {
        const typeResponse = await fetch(type.type.url);
        const typeData = await typeResponse.json();
        return typeData.damage_relations;
      });

      const speciesResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${data.id}/`
      );
      const speciesData = await speciesResponse.json();

      const flavorTextEntry = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "en" && entry.version.name === "red"
      );

      const description = flavorTextEntry ? flavorTextEntry.flavor_text : "";

      const damageRelations = await Promise.all(typePromises);

      const detailedData = {
        ...data,
        damage_relations: damageRelations,
        description: description,
      };

      setSearchResult([detailedData]);
    } catch (error) {
      console.log(error);
      console.log("Could not fetch");
    }
  };

  console.log(pokemonsDetails);

  return (
    <section className="home--container">
      <Navigation
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        fetchSearch={fetchSearch}
        setSearchState={setSearchState}
        searchState={searchState}
        setSearchResult={setSearchResult}
        setOrderStrength={setOrderStrength}
        setOrderHeight={setOrderHeight}
        setOrderWeight={setOrderWeight}
        setTypeFilter={setTypeFilter}
      />

      <div className="home--section">
        <Categories onTypeClick={changeTypeFilter} />
        <List
          pokemonsDetails={searchState ? searchResult : pokemonsDetails}
          setSelectedPokemon={setSelectedPokemon}
        />

        <Pokemon selectedPokemon={selectedPokemon} />
      </div>
    </section>
  );
}

export default HomePage;
