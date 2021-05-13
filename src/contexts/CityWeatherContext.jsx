import { createContext, useState } from "react";

import { states, cities } from '../brazilian-cities.json';

export const CityWeatherContext = createContext({});

export function CityWeatherProvider({ children }) {

  const [currentCity, setCurrentCity] = useState({ cityName: 'Teresina' });

  function selectCity(cityId) {
    const city = cities.find(({ id }) => id === cityId);
    const state = states[city.state_id];

    setCurrentCity({
      cityName: city.name,
      stateName: state
    });
  }

  return (
    <CityWeatherContext.Provider
      value={{
        states,
        cities,
        currentCity,
        setCurrentCity,
        selectCity
      }}
    >
      {children}
    </CityWeatherContext.Provider>
  );
}