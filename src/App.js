import CityWeather from './components/CityWeather';

import styles from './styles/app.module.scss';

function App() {

  return (
    <div className={styles.containerApp}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/backgrounds/clouds.jpg')` }}
      ></div>
      <CityWeather />
      <div className={styles.citySelector}>

      </div>
    </div>
  );
}

export default App;
