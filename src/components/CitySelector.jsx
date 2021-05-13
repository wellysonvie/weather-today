import { useContext, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { CityWeatherContext } from '../contexts/CityWeatherContext';

import styles from '../styles/components/CitySelector.module.scss';

const CitySelector = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { states, cities, selectCity } = useContext(CityWeatherContext);

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
    <div className={styles.citySelector}>
      <div className={styles.citySelectorSearch}>
        <input
          type="text"
          placeholder="Outra cidade"
          onChange={searchCity}
        />
        <button><BiSearch /></button>
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
    </div>
  );
}

export default CitySelector;