import { createAction, props } from '@ngrx/store';
import { Bomb } from '../components/bomb/bomb.component';


export const captureBomb = createAction('[Bomb] capture bomb', props<{ bomb: Bomb }>());
export const releaseBomb = createAction('[Bomb] release bomb');
export const increaseScore = createAction('[Score] increase score');
export const degreaseScore = createAction('[Score] degrease score');
