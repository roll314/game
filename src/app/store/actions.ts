import { createAction, props } from '@ngrx/store';
import {Bomb} from '../components/bomb/bomb.component';


export const setActiveBomb = createAction('[Bombs] set active bomb', props<{ payload: Bomb }>());
