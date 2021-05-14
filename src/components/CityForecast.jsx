import { useContext } from 'react';
import { CityWeatherContext } from '../contexts/CityWeatherContext';

import styles from '../styles/components/CityForecast.module.scss';

const CityForecast = () => {
  const { cityWeather } = useContext(CityWeatherContext);

  return (
    <div className={styles.cityForecast}>
      <h2>Próximos dias:</h2>
      {cityWeather ?
        cityWeather.forecast.map(({ date, temperature, description, windSpeed }) => (
          <div key={date} className={styles.forecastDay}>
            <h3>
              {new Date(date + ' 00:00:00').toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h3>
            <p>Temperatura: {temperature}° C</p>
            <p>Clima: {description}</p>
            <p>Vento: {windSpeed} km/h</p>
          </div>
        ))
        :
        <p>Buscando dados...</p>
      }
    </div>
  );
}

export default CityForecast;