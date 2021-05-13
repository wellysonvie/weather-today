import { useContext } from 'react';
import { FaSun, FaCloud, FaCloudSun, FaCloudRain, FaMoon, FaCloudMoon } from 'react-icons/fa';
import { BiWind } from 'react-icons/bi';
import { CityWeatherContext } from '../contexts/CityWeatherContext';

import styles from '../styles/components/CityWeather.module.scss';

const CityWeather = () => {
  const { currentCity, cityWeather, weatherStatus, isNight } = useContext(CityWeatherContext);

  const weatherIcon = {
    'clearSky': isNight ? <FaMoon /> : <FaSun />,
    'cloud': isNight ? <FaCloudMoon /> : <FaCloudSun />,
    'clouds': <FaCloud />,
    'rain': <FaCloudRain />,
    'default': <FaCloud />,
  }

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
              {weatherIcon[weatherStatus]}
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