import { FaCloudSun } from 'react-icons/fa';
import { BiWind } from 'react-icons/bi';

import styles from '../styles/components/CityWeather.module.scss';

const CityWeather = () => {
  return (
    <div className={styles.cityWeather}>
      <h1 className={styles.appName}>Weather Today</h1>
      <div className={styles.description}>
        <span className={styles.temperature}>26°</span>
        <div className={styles.time}>
          <h2>São Paulo</h2>
          <p>10:36 - Segunda-feira, 10 de Maio de 2021</p>
        </div>
        <div className={styles.sky}>
          <FaCloudSun />
          <span>Poucas nuvens</span>
        </div>
        <div className={styles.wind}>
          <BiWind />
          <span>6 km/h</span>
        </div>
      </div>
    </div>
  );
}

export default CityWeather;