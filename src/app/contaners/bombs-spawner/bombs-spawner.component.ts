import {Component, ElementRef, OnInit} from '@angular/core';
import {Bomb, getBombRadius} from '../../components/bomb/bomb.component';
import {GameFacade} from '../../store/facade';
import {ComponentWithSubscription} from '../../core/ComponentWithSubscription';
import {Bin} from '../../components/bin/bin.component';
import {animate, style, transition, trigger} from '@angular/animations';
import {
  BOMBS_COUNT_TILL_GAME_END,
  COLORS,
  END_BOMB_SPAWN_INTERVAL_MS,
  MAX_BOMB_LIFE_TIME_MS,
  MIN_BOMB_LIFE_TIME_MS,
  START_BOMB_SPAWN_INTERVAL_MS
} from '../../settings';

@Component({
  selector: 'app-bombs-spawner',
  templateUrl: './bombs-spawner.component.html',
  styleUrls: ['./bombs-spawner.component.scss'],
  animations: [
    trigger('hide', [
      transition(':enter', [
        style({opacity: 0}),
        animate('200ms', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('200ms', style({opacity: 0}))
      ])
    ])
  ]
})
export class BombsSpawnerComponent extends ComponentWithSubscription implements OnInit {

  capturedBomb: Bomb;
  activeBin: Bin;

  bombSpawnInterval: number = START_BOMB_SPAWN_INTERVAL_MS;

  perBombSpawnIntervalChange: number = (START_BOMB_SPAWN_INTERVAL_MS - END_BOMB_SPAWN_INTERVAL_MS) / BOMBS_COUNT_TILL_GAME_END;

  bombs: Bomb[] = [];

  bombsSpawned = 0;

  constructor(
    private gameFacade: GameFacade,
    private elementRef: ElementRef
  ) {
    super();
  }

  ngOnInit() {
    this.subscribeUntilDestroyed(this.gameFacade.getCapturedBomb(), (capturedBomb: Bomb) => this.capturedBomb = capturedBomb);
    this.subscribeUntilDestroyed(this.gameFacade.getActiveBin(), (activeBin: Bin) => this.activeBin = activeBin);

    this.addBomb();
    this.spawn();
  }

  explodeBomb(bomb: Bomb) {
    this.removeBomb(bomb);

    if (this.capturedBomb === bomb) {
      this.gameFacade.releaseBomb();
    }

    this.gameFacade.degreaseScore();
  }

  captureBomb(bomb: Bomb) {
    this.gameFacade.captureBomb(bomb);
  }

  releaseBomb() {
    if (this.activeBin) {
      this.removeBomb(this.capturedBomb);

      if (this.activeBin.color === this.capturedBomb.color) {
        this.gameFacade.increaseScore();
      } else {
        this.gameFacade.degreaseScore();
      }
    }

    this.gameFacade.releaseBomb();
  }

  private removeBomb(bomb: Bomb) {
    this.bombs = this.bombs.filter((item) => item !== bomb);

    if (this.bombs.length === 0 && this.bombsSpawned >= BOMBS_COUNT_TILL_GAME_END) {
      this.gameFacade.finishGame();
    }
  }

  private spawn() {
    setTimeout(() => {
      this.bombSpawnInterval -= this.perBombSpawnIntervalChange;

      this.addBomb();

      if (this.bombsSpawned < BOMBS_COUNT_TILL_GAME_END) {
        this.spawn();
      }
    }, this.bombSpawnInterval);
  }

  private addBomb() {
    const nativeElement: HTMLElement = this.elementRef.nativeElement;
    const rect: ClientRect = nativeElement.getBoundingClientRect();
    const x = Math.random() * (rect.width - getBombRadius() * 2);
    const y = Math.random() * (rect.height - getBombRadius() * 2);

    const index = Math.floor(Math.random() * COLORS.length);
    const color = COLORS[index];

    const timeout = MIN_BOMB_LIFE_TIME_MS + Math.random() * (MAX_BOMB_LIFE_TIME_MS - MIN_BOMB_LIFE_TIME_MS);

    this.bombs.push(new Bomb(x, y, color, timeout));

    this.bombsSpawned++;
  }
}
