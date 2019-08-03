import * as actions from './actions';
import {Bomb} from '../components/bomb/bomb.component';
import {createReducer, on} from '@ngrx/store';
import {Bin} from '../components/bin/bin.component';
import {TIME_TO_BINS_COLORS_MS} from '../settings';


export enum GameStatus {
  InProgress,
  Finished
}

export interface IGameState {
  activeBin: Bin;
  capturedBomb: Bomb;
  score: number;
  timeToColorChange: number;
  gameStatus: GameStatus;
}

const initialState: IGameState = {
  activeBin: undefined,
  capturedBomb: undefined,
  score: 0,
  timeToColorChange: TIME_TO_BINS_COLORS_MS,
  gameStatus: GameStatus.InProgress
};

const reducer = createReducer(initialState,
  on(actions.setActiveBin, (state, {bin}) => ({
    ...state,
    activeBin: bin
  })),

  on(actions.captureBomb, (state, {bomb}) => ({
    ...state,
    capturedBomb: bomb
  })),
  on(actions.releaseBomb, (state) => ({
    ...state,
    capturedBomb: undefined
  })),

  on(actions.increaseScore, (state) => ({
    ...state,
    score: state.score + 1
  })),
  on(actions.degreaseScore, (state) => ({
    ...state,
    score: state.score - 1
  })),

  on(actions.setTimeToColorChange, (state, {time}) => ({
    ...state,
    timeToColorChange: time
  })),

  on(actions.finishGame, (state) => ({
    ...state,
    gameStatus: GameStatus.Finished
  }))
);

export function gameReducer(defaultState: IGameState = initialState, action: any) {
  return reducer(defaultState, action);
}
