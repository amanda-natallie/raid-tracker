/* eslint-disable @typescript-eslint/no-explicit-any */
import { action } from 'typesafe-actions';

import { LayoutState, LayoutTypes } from './types';

export const setIsLoading = (isLoading: boolean): any => action(LayoutTypes.SET_IS_LOADING, isLoading);
export const setDialogInfo = (dialogInfo: LayoutState['dialog']): any =>
    action(LayoutTypes.SET_DIALOG_INFO, dialogInfo);
export const resetDialog = (): any => action(LayoutTypes.RESET_DIALOG);
export const setRefreshList = (): any => action(LayoutTypes.SET_REFRESH);
