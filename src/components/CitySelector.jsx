import { useContext, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import CityForecast from './CityForecast';
import { CityWeatherContext } from '../contexts/CityWeatherContext';

import styles from '../styles/components/CitySelector.module.scss';

const CitySelector = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { states, cities, selectCity } = useContext(CityWeatherContext);
  const [citySelectorIsVisible, setCitySelectorIsVisible] = useState(false);

  function searchCity({ target }) {
    const cityName = target.value.trim().toLowerCase();
    if (cityName === '')
      setSearchResults([]);
    else
      setSearchResults(cities.filter(({ name }) => {
        return name.toLowerCase().includes(cityName)
      }));
  }

  return (
    <>
      <div
        className={styles.btnOpen}
        style={{ display: !citySelectorIsVisible ? 'flex' : 'none' }}
        onClick={() => setCitySelectorIsVisible(true)}
      >
        <BiSearch />
      </div>
      <div
        className={styles.citySelector}
        style={{ display: citySelectorIsVisible ? 'flex' : 'none' }}
      >
        <div className={styles.citySelectorHeader}>
          <span onClick={() => setCitySelectorIsVisible(false)}>&times;</span>
          <h2>Selecionar cidade</h2>
        </div>
        <div className={styles.citySelectorSearch}>
          <input
            type="text"
            placeholder="Nome da cidade"
            onChange={searchCity}
            style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/assets/search.svg` }}
          />
        </div>
        <div className={styles.citySelectorSearchResult}>
          <ul>
            {searchResults.map(({ id, state_id, name }) => (
              <li
                key={id}
                onClick={() => selectCity(id)}
              >
                {name}, {states[state_id]}
              </li>
            ))}
          </ul>
        </div>
        <CityForecast />
      </div>
    </>
  );
}

export default CitySelector;