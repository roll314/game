import {GameStatus, IGameState} from './reducer';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';

import * as actions from './actions';
import * as selectors from './selectors';
import {Bomb} from '../components/bomb/bomb.component';
import {Observable} from 'rxjs';
import {Bin} from '../components/bin/bin.component';


@Injectable({
  providedIn: 'root'
})
export class GameFacade {
  constructor(private store: Store<IGameState>) {
  }

  setActiveBin(bin: Bin) {
    this.store.dispatch(actions.setActiveBin({bin}));
  }

  getActiveBin(): Observable<Bin> {
    return this.store.select(selectors.selectActiveBin);
  }

  captureBomb(bomb: Bomb) {
    this.store.dispatch(actions.captureBomb({bomb}));
  }

  releaseBomb() {
    this.store.dispatch(actions.releaseBomb());
  }

  increaseScore() {
    this.store.dispatch(actions.increaseScore());
  }

  degreaseScore() {
    this.store.dispatch(actions.degreaseScore());
  }

  getCapturedBomb(): Observable<Bomb> {
    return this.store.select(selectors.selectCapturedBomb);
  }

  getScore(): Observable<number> {
    return this.store.select(selectors.selectScore);
  }

  setTimeToColorChange(time: number) {
    this.store.dispatch(actions.setTimeToColorChange({time}));
  }

  getTimeToColorChange(): Observable<number> {
    return this.store.select(selectors.selectTimeToColorChange);
  }

  getGameStatus(): Observable<GameStatus> {
    return this.store.select(selectors.selectGameStatus);
  }

  finishGame() {
    this.store.dispatch(actions.finishGame());
  }
}
