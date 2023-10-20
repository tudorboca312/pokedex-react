import React from "react";
import "./Categories.css";
import { useEffect, useState } from "react";

function Categories({ onTypeClick }) {
  const typeColors = [
    "#A8A878", // Normal
    "#C03028", // Fighting
    "#A890F0", // Flying
    "#A040A0", // Poison
    "#E0C068", // Ground
    "#B8A038", // Rock
    "#A8B820", // Bug
    "#705898", // Ghost
    "#B8B8D0", // Steel
    "#F08030", // Fire
    "#6890F0", // Water
    "#78C850", // Grass
    "#F8D030", // Electric
    "#F85888", // Psychic
    "#98D8D8", // Ice
    "#7038F8", // Dragon
    "#705848", // Dark
    "#EE99AC", // Fairy
    "#68A090", // Unknown
    "#4A4444", // Shadow
  ];
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type")
      .then((response) => response.json())
      .then((data) => setTypes(data.results));
  }, []);

  return (
    <div className="categories--container">
      <ul className="categories--ul">
        {types.map((type, index) => (
          <li
            className="categories--li box--shadow"
            key={type.name}
            style={{ color: typeColors[index] }}
            onClick={() => onTypeClick(type.name)}
          >
            {type.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
