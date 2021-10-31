import { combineReducers } from 'redux';

import layout from './layout';

import { LayoutState } from './layout/types';

export interface RootReducer {
    layout: LayoutState;
}

const rootReducer = combineReducers({
    layout,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
