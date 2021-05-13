import { useContext } from 'react';
import CitySelector from './components/CitySelector';
import CityWeather from './components/CityWeather';
import { CityWeatherContext } from './contexts/CityWeatherContext';

import styles from './styles/app.module.scss';

function App() {

  const { isNight, weatherStatus } = useContext(CityWeatherContext);

  const backgrounds = {
    'clearSky': isNight ? 'clearSky-night.jpg' : 'clearSky-morning.jpg',
    'cloud': isNight ? 'fewClouds-night.jpg' : 'fewClouds-morning.jpg',
    'clouds': isNight ? 'cloudy-night.jpg' : 'cloudy-morning.jpg',
    'rain': isNight ? 'rain-night.jpg' : 'rain-morning.jpg',
    'default': isNight ? 'clearSky-night.jpg' : 'clearSky-morning.jpg',
  }

  console.log(backgrounds[weatherStatus]);

  return (
    <div className={styles.containerApp}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/backgrounds/${backgrounds[weatherStatus]}')` }}
      ></div>
      <CityWeather />
      <CitySelector />
    </div>
  );
}

export default App;
