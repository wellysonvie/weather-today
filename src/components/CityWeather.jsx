import { useContext, useEffect, useState } from 'react';
import { FaSun, FaCloud, FaCloudSun, FaCloudRain, FaMoon, FaCloudMoon } from 'react-icons/fa';
import { BiWind } from 'react-icons/bi';
import { CityWeatherContext } from '../contexts/CityWeatherContext';

import styles from '../styles/components/CityWeather.module.scss';

const CityWeather = () => {
  const { currentCity } = useContext(CityWeatherContext);
  const [cityWeather, setCityWeather] = useState(null);

  function getTypeIconWeather() {
    const description = cityWeather.description.toLowerCase();
    const isNight = new Date(cityWeather.dateTime).getHours() >= 18;
    console.log(cityWeather.dateTime);

    if (description.includes('sol') || description.includes('limpo'))
      return isNight ? <FaMoon /> : <FaSun />;
    if (description.includes('parcialmente nublado'))
      return isNight ? <FaCloudMoon /> : <FaCloudSun />;
    if (description.includes('chuv') || description.includes('aguaceiro'))
      return <FaCloudRain />;
    return <FaCloud />;
  }

  useEffect(() => {
    setCityWeather(null);
    fetch(`http://pt.wttr.in/${currentCity.cityName}?format=j1`)
      .then(response => response.json())
      .then(data => setCityWeather({
        temperature: data.current_condition[0].temp_C,
        description: data.current_condition[0].lang_pt[0].value,
        windSpeed: data.current_condition[0].windspeedKmph,
        dateTime: Date.now()
      }));
  }, [currentCity]);

  return (
    <div className={styles.cityWeather}>
      <h1 className={styles.appName}>Weather Today</h1>
      <div className={styles.description}>
        {cityWeather ? (
          <>
            <span className={styles.temperature}>{cityWeather.temperature}°</span>
            <div className={styles.time}>
              <h2>{currentCity.cityName}</h2>
              <p>
                {new Date(cityWeather.dateTime).toLocaleString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                })}
              </p>
            </div>
            <div className={styles.weatherDescription}>
              {getTypeIconWeather(cityWeather.description)}
              <span>{cityWeather.description}</span>
            </div>
            <div className={styles.wind}>
              <BiWind />
              <span>{cityWeather.windSpeed} km/h</span>
            </div>
          </>
        ) : (
          <p>Buscando dados...</p>
        )}
      </div>
    </div>
  );
}

export default CityWeather;