const Countries = ({ countryOnDisplay, setCountryOnDisplay }) => {
  if (countryOnDisplay.length === 1) return null;

  return countryOnDisplay.map((country) => (
    <div key={country.name.official}>
      {country.name.common}{" "}
      <button onClick={() => setCountryOnDisplay([country])}>show</button>
    </div>
  ));
};

export default Countries;