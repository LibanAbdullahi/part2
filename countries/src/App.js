import React, { useState } from "react";
import axios from "axios";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [weather, setWeather] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [weatherError, setWeatherError] = useState("");
  const openWeatherMapApiKey = process.env.REACT_APP_API_KEY;

  const handleSearch = async event => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://restcountries.com/v2/name/${searchQuery}`
      );
      if (response.data.length > 1) {
        setErrorMessage("");
        setSearchResults(response.data);
        setSelectedCountry({});
        setWeather({});
      } else if (response.data.length === 1) {
        setErrorMessage("");
        setSearchResults(response.data);
        setSelectedCountry(response.data[0]);
        fetchWeather(response.data[0].capital);
      } else {
        setErrorMessage("No country found with that name");
        setSearchResults([]);
        setSelectedCountry({});
        setWeather({});
      }
    } catch (error) {
      setErrorMessage(
        "An error occurred while fetching data. Please try again."
      );
      setSearchResults([]);
      setSelectedCountry({});
      setWeather({});
    }
  };

  const handleCountrySelect = async country => {
    setSelectedCountry(country);
    fetchWeather(country.capital);
  };

  const fetchWeather = async capital => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${openWeatherMapApiKey}`
      );
      setWeatherError("");
      setWeather(weatherResponse.data);
    } catch (error) {
      setWeatherError(
        "An error occurred while fetching weather data. Please try again."
      );
      setWeather({});
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label htmlFor="search">Find countries</label>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search for a country"
        />
        <button type="submit">Search</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {weatherError && <p>{weatherError}</p>}
      {Object.keys(selectedCountry).length > 0 ? (
        <div>
          <h1>{selectedCountry.name}</h1>

          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area}</p>
          <p>
            <strong>Languages:</strong>
            <ul>
              {selectedCountry.languages.map(language => (
                <li key={language.iso639_1}>{language.name}</li>
              ))}
            </ul>
          </p>
          <img
            src={selectedCountry.flag}
            alt={`Flag of ${selectedCountry.name}`}
            width="200"
          />

          {weather.main && (
            <div>
              <h2>Weather in {selectedCountry.capital}</h2>
              <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)} ℃</p>
              <img
                src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt="Weather icon"
              />

              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      ) : (
        <ul>
          {searchResults.map(result => (
            <li key={result.name}>
              {result.name}
              <button onClick={() => handleCountrySelect(result)}>Show</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
