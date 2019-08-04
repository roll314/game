import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BombComponent} from './components/bomb/bomb.component';
import {MsPipe} from './pipes/ms.pipe';
import {BombsSpawnerComponent} from './contaners/bombs-spawner/bombs-spawner.component';
import {StoreModule} from '@ngrx/store';
import {gameReducer} from './store/reducer';
import {BinsContainerComponent} from './contaners/bins-container/bins-container.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BinComponent} from './components/bin/bin.component';

@NgModule({
  declarations: [
    AppComponent,
    BombComponent,
    MsPipe,
    BombsSpawnerComponent,
    BinComponent,
    BinsContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('game', gameReducer),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
