import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { CityWeatherProvider } from './contexts/CityWeatherContext';

ReactDOM.render(
  <CityWeatherProvider>
    <App />
  </CityWeatherProvider>,
  document.getElementById('root')
);