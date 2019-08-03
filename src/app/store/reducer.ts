import * as actions from './actions';
import {Bomb} from '../components/bomb/bomb.component';
import {createReducer, on} from '@ngrx/store';



export interface IGameState {
  capturedBomb: Bomb;
  score: number;
}

const initialState: IGameState = {
  capturedBomb: undefined,
  score: 0
};

const reducer = createReducer(initialState,
  on(actions.captureBomb, (state, { bomb }) => ({
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
  }))

);

export function gameReducer(defaultState: IGameState = initialState, action: any) {
  return reducer(defaultState, action);
}
