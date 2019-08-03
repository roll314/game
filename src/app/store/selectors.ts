import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IGameState} from './reducer';

export const selectGameState = createFeatureSelector<IGameState>('game');

export const selectCapturedBomb = createSelector(selectGameState, (state: IGameState) => state.capturedBomb);
export const selectScore = createSelector(selectGameState, (state: IGameState) => state.score);
