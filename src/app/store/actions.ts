import {createAction, props} from '@ngrx/store';
import {Bomb} from '../components/bomb/bomb.component';
import {Bin} from '../components/bin/bin.component';


export const captureBomb = createAction('[Bomb] capture bomb', props<{ bomb: Bomb }>());
export const releaseBomb = createAction('[Bomb] release bomb');

export const increaseScore = createAction('[Score] increase score');
export const degreaseScore = createAction('[Score] degrease score');

export const setTimeToColorChange = createAction('[Timers] set time to color change', props<{ time: number }>());

export const setActiveBin = createAction('[Bin] set active bin', props<{ bin: Bin}>());

export const finishGame = createAction('[Game] finish game');
