import { createContext } from "react";

import { states, cities } from '../brazilian-cities.json';

export const CityWeatherContext = createContext({});

export function CityWeatherProvider({ children }) {

  return (
    <CityWeatherContext.Provider
      value={{
        states,
        cities
      }}>
      {children}
    </CityWeatherContext.Provider>
  );
}