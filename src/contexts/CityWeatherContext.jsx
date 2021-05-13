import { createContext, useCallback, useEffect, useRef, useState } from "react";

import { states, cities } from '../brazilian-cities.json';

export const CityWeatherContext = createContext({});

export function CityWeatherProvider({ children }) {

  const [currentCity, setCurrentCity] = useState({ cityName: 'Teresina' });
  const [cityWeather, setCityWeather] = useState(null);
  const [weatherStatus, setWeatherStatus] = useState('default');
  const [isNight, setIsNight] = useState(false);
  const timeoutRef = useRef();

  function selectCity(cityId) {
    const city = cities.find(({ id }) => id === cityId);
    const state = states[city.state_id];

    setCurrentCity({
      cityName: city.name,
      stateName: state
    });
  }

  const updateCityWeather = useCallback(() => {
    fetch(`http://pt.wttr.in/${currentCity.cityName}?format=j1`)
      .then(response => response.json())
      .then(data => setCityWeather({
        temperature: data.current_condition[0].temp_C,
        description: data.current_condition[0].lang_pt[0].value,
        windSpeed: data.current_condition[0].windspeedKmph
      }));
  }, [currentCity]);

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      updateCityWeather()
    }, 1000 * 60 * 20); // 20 minutes

    return () => clearTimeout(timeoutRef.current);
  }, [updateCityWeather]);

  useEffect(() => {
    setCityWeather(null);
    updateCityWeather();
  }, [currentCity, updateCityWeather]);

  useEffect(() => {
    if (cityWeather) {
      setIsNight(new Date().getHours() >= 18);

      const description = cityWeather.description.toLowerCase();

      if (description.includes('sol') || description.includes('limpo'))
        setWeatherStatus('clearSky');
      else if (description.includes('parcialmente nublado'))
        setWeatherStatus('cloud');
      else if (description.includes('nublado'))
        setWeatherStatus('clouds');
      else if (description.includes('chuv') || description.includes('aguaceiro'))
        setWeatherStatus('rain');
      else
        setWeatherStatus('default');
    }
  }, [cityWeather]);

  return (
    <CityWeatherContext.Provider
      value={{
        states,
        cities,
        currentCity,
        setCurrentCity,
        selectCity,
        cityWeather,
        setCityWeather,
        weatherStatus,
        isNight
      }}
    >
      {children}
    </CityWeatherContext.Provider>
  );
}