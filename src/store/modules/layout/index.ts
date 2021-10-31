import { Reducer } from 'redux';

import { LayoutState, LayoutTypes } from './types';

const INITIAL_STATE: LayoutState = {
    isLoading: false,
    refreshList: false,
    dialog: {
        width: '400px',
        disableBackdropClick: false,
        isOpen: false,
        info: {
            title: '',
            subtitle: '',
            cancelButton: {
                title: '',
                action: () => null,
            },
            confirmButton: {
                title: '',
                action: () => null,
            },
            children: null,
        },
    },
};

const reducer: Reducer<LayoutState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LayoutTypes.SET_IS_LOADING:
            return { ...state, isLoading: action.payload, refreshList: !state.refreshList };
        case LayoutTypes.SET_DIALOG_INFO:
            return { ...state, dialog: action.payload, refreshList: !state.refreshList };
        case LayoutTypes.RESET_DIALOG:
            return { ...state, dialog: { ...state.dialog, isOpen: false }, refreshList: !state.refreshList };
        case LayoutTypes.SET_REFRESH:
            return { ...state, refreshList: !state.refreshList };
        default:
            return state;
    }
};

export default reducer;
