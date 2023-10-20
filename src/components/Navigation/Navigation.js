import React from "react";
import "./Navigation.css";

function Navigation({
  setSearchInput,
  searchInput,
  fetchSearch,
  setSearchState,
  searchState,
  setSearchResult,
  setOrderStrength,
  setOrderWeight,
  setOrderHeight,
  setTypeFilter,
}) {
  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };
  console.log(searchInput);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchSearch(searchInput.toLowerCase());
    setSearchState(true);
  };

  const goHome = (event) => {
    event.preventDefault();
    setSearchState(false);
    setSearchResult(null);
    setTypeFilter("");
  };

  const changeStrength = (e) => {
    e.preventDefault();
    setOrderHeight(false);
    setOrderWeight(false);
    setOrderStrength((prev) => !prev);
  };
  const changeWeight = (e) => {
    e.preventDefault();
    setOrderStrength(false);
    setOrderHeight(false);
    setOrderWeight((prev) => !prev);
  };
  const changeHeight = (e) => {
    e.preventDefault();
    setOrderWeight(false);
    setOrderStrength(false);
    setOrderHeight((prev) => !prev);
  };

  return (
    <section className="nav--container">
      <img
        src="logo.png"
        alt="logo"
        style={{ width: "4rem", cursor: "pointer" }}
        onClick={goHome}
        className="pikachu--img"
      />
      <form onSubmit={handleSubmit} className="search-bar box--shadow">
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleChange}
          className="search-input"
        />
        <button type="submit" className="search-button" onSubmit={handleSubmit}>
          <img src="./pokeball.png" alt="Search" className="pokeball-button" />
        </button>
      </form>
      <section className="nav--buttons">
        <button
          className="btn--strength box--shadow  btn--organization"
          onClick={changeStrength}
        >
          Strength
        </button>
        <button
          className="btn--weight box--shadow btn--organization"
          onClick={changeWeight}
        >
          Weight
        </button>
        <button
          className="btn--height box--shadow btn--organization"
          onClick={changeHeight}
        >
          Height
        </button>
      </section>
    </section>
  );
}

export default Navigation;
