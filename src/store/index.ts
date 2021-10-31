/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserHistory } from 'history';
import { createStore } from 'redux';

import rootReducer from './modules';

export const history = createBrowserHistory();

const store = createStore(rootReducer);

export default store;
