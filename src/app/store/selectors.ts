import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IGameState} from './reducer';

export const selectGameState = createFeatureSelector<IGameState>('game');

export const selectCapturedBomb = createSelector(selectGameState, (state: IGameState) => state.capturedBomb);
export const selectActiveBin = createSelector(selectGameState, (state: IGameState) => state.activeBin);
export const selectScore = createSelector(selectGameState, (state: IGameState) => state.score);
export const selectTimeToColorChange = createSelector(selectGameState, (state: IGameState) => state.timeToColorChange);
export const selectGameStatus = createSelector(selectGameState, (state: IGameState) => state.gameStatus);
