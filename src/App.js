import CitySelector from './components/CitySelector';
import CityWeather from './components/CityWeather';
import { CityWeatherProvider } from './contexts/CityWeatherContext';

import styles from './styles/app.module.scss';

function App() {

  return (
    <CityWeatherProvider>
      <div className={styles.containerApp}>
        <div
          className={styles.background}
          style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/backgrounds/clouds.jpg')` }}
        ></div>
        <CityWeather />
        <CitySelector />
      </div>
    </CityWeatherProvider>
  );
}

export default App;
