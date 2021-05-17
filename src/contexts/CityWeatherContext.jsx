import { createContext, useCallback, useEffect, useRef, useState } from "react";

import { states, cities } from '../brazilian-cities.json';

export const CityWeatherContext = createContext({});

export function CityWeatherProvider({ children }) {

  const [currentCity, setCurrentCity] = useState({ cityName: 'São Paulo' });
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
    fetch(`https://pt.wttr.in/${currentCity.cityName}?format=j1`)
      .then(response => response.json())
      .then(data => setCityWeather({
        temperature: data.current_condition[0].temp_C,
        description: data.current_condition[0].lang_pt[0].value,
        windSpeed: data.current_condition[0].windspeedKmph,
        forecast: [
          {
            date: data.weather[1].date,
            temperature: data.weather[1].avgtempC,
            description: data.weather[1].hourly[3].lang_pt[0].value,
            windSpeed: data.weather[1].hourly[3].windspeedKmph
          },
          {
            date: data.weather[2].date,
            temperature: data.weather[2].avgtempC,
            description: data.weather[2].hourly[3].lang_pt[0].value,
            windSpeed: data.weather[2].hourly[3].windspeedKmph
          }
        ]
      }));
  }, [currentCity]);

  useEffect(() => {
    function showPosition(position) {
      fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?' + new URLSearchParams({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        localityLanguage: 'pt'
      }))
        .then(response => response.json())
        .then(data => setCurrentCity({ cityName: data.city }));
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }, []);

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