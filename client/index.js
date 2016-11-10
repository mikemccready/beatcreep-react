// index.js
import React from 'react';
import {render} from 'react-dom';

import App from './containers/App';

// attach point
const mountPoint = document.getElementById('main-container');

render(<App />, mountPoint);