import {Component, OnInit} from '@angular/core';
import {ComponentWithSubscription} from './core/ComponentWithSubscription';
import {GameFacade} from './store/facade';
import {GameStatus} from './store/reducer';

const INFO_FONT_SIZE_FACTOR = 20;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '(window:resize)': 'sizeToFactor()'
  }
})
export class AppComponent extends ComponentWithSubscription implements OnInit {
  score: number;
  timeToColorChange: number;

  infoFontSize: number;
  gameStatus: GameStatus;
  GameStatus = GameStatus;

  constructor(private gameFacade: GameFacade) {
    super();
  }

  ngOnInit(): void {
    this.sizeToFactor();

    this.subscribeUntilDestroyed(this.gameFacade.getGameStatus(), (status: GameStatus) => this.gameStatus = status);
    this.subscribeUntilDestroyed(this.gameFacade.getScore(), (score: number) => this.score = score);
    // tslint:disable-next-line:max-line-length
    this.subscribeUntilDestroyed(this.gameFacade.getTimeToColorChange(), (timeToColorChange: number) => this.timeToColorChange = timeToColorChange);
  }

  private sizeToFactor() {
    this.infoFontSize = Math.min(window.innerHeight, window.innerWidth) / INFO_FONT_SIZE_FACTOR;
  }
}
