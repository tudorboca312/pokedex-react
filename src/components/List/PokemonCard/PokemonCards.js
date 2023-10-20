import React from "react";
import "./PokemonCard.css";

function PokemonCards({
  name,
  height,
  weight,
  image,
  type1,
  type2,
  setSelectedPokemon,
  stats,
  base_experience,
  description,
  id,
  damage_relations,
}) {
  function getTypeColor(typee) {
    switch (
      typee.toLowerCase() // convert typee to lower case
    ) {
      case "normal":
        return "#A8A878";
      case "fighting":
        return "#C03028";
      case "flying":
        return "#A890F0";
      case "poison":
        return "#A040A0";
      case "ground":
        return "#E0C068";
      case "rock":
        return "#B8A038";
      case "bug":
        return "#A8B820";
      case "ghost":
        return "#705898";
      case "steel":
        return "#B8B8D0";
      case "fire":
        return "#F08030";
      case "water":
        return "#6890F0";
      case "grass":
        return "#78C850";
      case "electric":
        return "#F8D030";
      case "psychic":
        return "#F85888";
      case "ice":
        return "#98D8D8";
      case "dragon":
        return "#7038F8";
      case "dark":
        return "#705848";
      case "fairy":
        return "#EE99AC";
      case "unknown":
        return "#68A090";
      case "shadow":
        return "#4A4444";
      default:
        return ""; // Handle unknown type
    }
  }
  return (
    <section
      className="card--container box--shadow"
      onClick={() =>
        setSelectedPokemon({
          name,
          image,
          weight,
          height,
          id,
          description,
          base_experience,
          stats: stats.map((stat) => ({
            name: stat.stat.name,
            value: stat.base_stat,
          })),
          damage_relations:
            damage_relations && damage_relations[0]
              ? damage_relations[0].double_damage_from.map((weak) => ({
                  weak_against: weak.name,
                }))
              : [],

          getTypeColor,
          type1,
          type2,
        })
      }
    >
      <span className="card--kg box--shadow stats">{weight / 10} kg</span>
      <span className="card--height stats box--shadow">{height / 10}m</span>
      <img src={image} alt="pokemon" className="card--img" />
      <p className="card--name">{name}</p>
      <div className="card--types">
        {type1 && (
          <p
            className="card--type stats"
            style={{ backgroundColor: getTypeColor(type1) }}
          >
            {type1}
          </p>
        )}
        {type2 && (
          <p
            className="card--type stats"
            style={{ backgroundColor: getTypeColor(type2) }}
          >
            {type2}
          </p>
        )}
      </div>
    </section>
  );
}

export default PokemonCards;
