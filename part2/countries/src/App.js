import React, { useState, useEffect } from 'react'
import axios from "axios";
import Countries from "./components/Countries";
import CountryData from "./components/CountryData";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryOnDisplay, setCountryOnDisplay] = useState([]);

  useEffect(() => {
    axios
        .get("https://restcountries.com/v3.1/all")
        .then((response) => {
          setCountries(response.data);
        });
  }, []);

  const handleQueryChange = (event) => {
    const search = event.target.value;
    setQuery(search);
    setCountryOnDisplay(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <div>
      <div>
        Find countries <input value={query} onChange={handleQueryChange} />
      </div>
      {countryOnDisplay.length === 1 ? (
        <CountryData country={countryOnDisplay[0]} />
      ) : null}
      {countryOnDisplay.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <Countries
          countryOnDisplay={countryOnDisplay}
          setCountryOnDisplay={setCountryOnDisplay}
        />
      )}
    </div>
  );
};

export default App;
