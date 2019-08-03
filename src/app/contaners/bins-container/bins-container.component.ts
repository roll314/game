import {Component, ElementRef, OnInit} from '@angular/core';
import {Bomb} from '../../components/bomb/bomb.component';
import {ComponentWithSubscription} from '../../utils/ComponentWithSubscription';
import {GameFacade} from '../../store/facade';
import {Bin} from '../../components/bin/bin.component';
import {BINS_COUNT, COLORS, TIME_TO_BINS_COLORS_MS} from '../../settings';
import {GameStatus} from '../../store/reducer';

const TICK_MS = 1000;

@Component({
  selector: 'app-bins-container',
  templateUrl: './bins-container.component.html',
  styleUrls: ['./bins-container.component.scss']
})
export class BinsContainerComponent extends ComponentWithSubscription implements OnInit {

  bins: Bin[] = [];

  private capturedBomb: Bomb;
  private activeBin: Bin;

  constructor(
    private elementRef: ElementRef,
    private gameFacade: GameFacade
  ) {
    super();

    for (let i = 0; i < BINS_COUNT; i++) {
      this.bins.push(new Bin(null));
    }
  }

  ngOnInit() {
    this.subscribeUntilDestroyed(this.gameFacade.getCapturedBomb(), (capturedBomb: Bomb) => {
      this.capturedBomb = capturedBomb;
      if (!capturedBomb) {
        this.gameFacade.setActiveBin(undefined);
      }
    });
    this.subscribeUntilDestroyed(this.gameFacade.getActiveBin(), (activeBin: Bin) => this.activeBin = activeBin);

    this.updateColors();

    let timeToColorsChange = TIME_TO_BINS_COLORS_MS;
    const interval = setInterval(() => {
      timeToColorsChange -= TICK_MS;

      this.gameFacade.setTimeToColorChange(timeToColorsChange);

      if (timeToColorsChange <= 0) {
        timeToColorsChange = TIME_TO_BINS_COLORS_MS;

        this.updateColors();
      }
    }, TICK_MS);

    this.subscribeUntilDestroyed(this.gameFacade.getGameStatus(), (gameStatus: GameStatus) => {
      if (gameStatus === GameStatus.Finished) {
        clearInterval(interval);
      }
    });
  }

  mouseOnBin(bin: Bin) {
    if (this.capturedBomb) {
      this.gameFacade.setActiveBin(bin);
    }
  }

  mouseOutOfBin(bin: Bin) {
    if (this.activeBin === bin) {
      this.gameFacade.setActiveBin(undefined);
    }
  }

  private updateColors() {
    const restOfColors = COLORS.concat();
    for (let i = 0; i < BINS_COUNT; i++) {
      const index = Math.floor(Math.random() * restOfColors.length);
      this.bins[i].color = restOfColors[index];
      restOfColors.splice(index, 1);
    }
  }
}
