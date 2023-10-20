import "./List.css";
import PokemonCards from "./PokemonCard/PokemonCards";

function List({ pokemonsDetails, setSelectedPokemon }) {
  const renderCards = () => {
    return pokemonsDetails && pokemonsDetails.length > 0
      ? pokemonsDetails.map((pokemon) => {
          const type1 = pokemon.types[0]?.type.name;
          const type2 = pokemon.types[1]?.type.name;
          return (
            <PokemonCards
              key={pokemon.name}
              name={pokemon.name}
              height={pokemon.height}
              weight={pokemon.weight}
              image={pokemon.sprites.front_default}
              type1={type1}
              type2={type2}
              stats={pokemon.stats}
              setSelectedPokemon={setSelectedPokemon}
              base_experience={pokemon.base_experience}
              id={pokemon.id}
              damage_relations={pokemon.damage_relations}
              description={pokemon.description}
            />
          );
        })
      : null;
  };

  return <section className="list--container">{renderCards()}</section>;
}

export default List;
