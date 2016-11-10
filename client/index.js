// index.js
import React from 'react';
import {render} from 'react-dom';
require('./styles/main.scss');

import App from './containers/App';

// attach point
const mountPoint = document.getElementById('main-container');

render(<App />, mountPoint);