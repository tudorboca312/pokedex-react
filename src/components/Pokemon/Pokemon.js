import React from "react";
import "./Pokemon.css";

function Pokemon({ selectedPokemon }) {
  if (!selectedPokemon) {
    return null;
  }

  const short = (word) => {
    switch (word) {
      case "hp":
        return "Hp";
      case "attack":
        return "Atk";
      case "defense":
        return "Dfs";
      case "special-attack":
        return "SpA";
      case "special-defense":
        return "SpD";
      case "speed":
        return "SPD";
      default:
        return "?????";
    }
  };
  const color = (word) => {
    switch (word) {
      case "hp":
        return "#FF4D4D"; // HP - Light Red background with White text
      case "attack":
        return "#4287f5"; // Attack - Light Blue background with White text
      case "defense":
        return "#58bf58"; // Defense - Light Green background with White text
      case "special-attack":
        return "#a86a29"; // Special Attack - Light Brown background with White text
      case "special-defense":
        return "#9a32cd"; // Special Defense - Light Purple background with White text
      case "speed":
        return "#f2f542"; // Speed - Light Yellow background with Black text
      default:
        return "#000000"; // Default - Black background with White text
    }
  };

  return (
    <section className="pokemon--container box--shadow">
      <img
        className="pokemon--img"
        src={selectedPokemon?.image}
        alt={selectedPokemon?.name}
      />
      <p className="pokemon--id">#{selectedPokemon?.id}</p>
      <p className="pokemon--name">{selectedPokemon?.name}</p>
      <div className="pokemon--types">
        {selectedPokemon.type1 && (
          <p
            className="pokemon--type"
            style={{
              backgroundColor: selectedPokemon.getTypeColor(
                selectedPokemon.type1
              ),
            }}
          >
            {selectedPokemon.type1}
          </p>
        )}
        {selectedPokemon.type2 && (
          <p
            className="pokemon--type"
            style={{
              backgroundColor: selectedPokemon.getTypeColor(
                selectedPokemon.type2
              ),
            }}
          >
            {selectedPokemon.type2}
          </p>
        )}
      </div>
      <div className="experience">
        <p className="experience--title">Experience</p>
        <p className="pokemon--experience">
          {selectedPokemon?.base_experience}
        </p>
      </div>
      <section className="pokemon--description--section">
        <h3 className="pokemon--title">Pokedex Descripton</h3>
        <p className="pokemon--description">{selectedPokemon?.description}</p>
      </section>
      <section className="pokemon--identity">
        <div className="height">
          <h3>Height</h3>
          <p className="pokemon--height">{selectedPokemon?.height / 10}m</p>
        </div>
        <div className="weight">
          <h3>Weight</h3>
          <p className="pokemon--weight">{selectedPokemon?.weight / 10}kg</p>
        </div>
      </section>
      <h3 className="stats--title">Stats</h3>
      {selectedPokemon?.stats && (
        <section className="pokemon--stats">
          {selectedPokemon.stats.map((stat, index) => (
            <div className="individual--stat" key={index}>
              <p
                className="stat--name"
                style={{ backgroundColor: color(stat.name) }}
              >
                {short(stat.name)}
              </p>
              <p className="stat--stat">{stat.value}</p>
            </div>
          ))}
        </section>
      )}
      <h3 className="weaknesses--title">Weaknesses</h3>
      {selectedPokemon?.damage_relations && (
        <section className="pokemon--weak">
          {selectedPokemon.damage_relations.map((weakness, index) => (
            <div
              className="weaknesses"
              key={index}
              style={{
                backgroundColor: selectedPokemon.getTypeColor(
                  weakness.weak_against
                ),
              }}
            >
              {weakness.weak_against}
            </div>
          ))}
        </section>
      )}
    </section>
  );
}

export default Pokemon;
