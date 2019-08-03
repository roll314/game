import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BombComponent } from './components/bomb/bomb.component';
import { MsPipe } from './pipes/ms.pipe';
import { BombsSpawnerComponent } from './contaners/bombs-spawner/bombs-spawner.component';
import { StoreModule } from '@ngrx/store';
import { gameReducer } from './store/reducer';
import { BinComponent } from './contaners/bin/bin.component';

@NgModule({
  declarations: [
    AppComponent,
    BombComponent,
    MsPipe,
    BombsSpawnerComponent,
    BinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('game', gameReducer),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
