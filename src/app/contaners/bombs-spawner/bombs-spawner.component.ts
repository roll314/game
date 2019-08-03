import { Component, OnInit } from '@angular/core';
import {Bomb} from '../../components/bomb/bomb.component';
import {GameFacade} from '../../store/facade';
import {takeUntil} from 'rxjs/operators';
import {ComponentWithSubscription} from '../../utils/ComponentWithSubscription';

@Component({
  selector: 'app-bombs-spawner',
  templateUrl: './bombs-spawner.component.html',
  styleUrls: ['./bombs-spawner.component.scss']
})
export class BombsSpawnerComponent extends ComponentWithSubscription implements OnInit {

  bomb: Bomb;

  bombs = [
    new Bomb(Math.random() * 500, Math.random() * 500, 'red', 5000 + Math.random() * 5000),
    new Bomb(Math.random() * 500, Math.random() * 500, 'blue',5000 + Math.random() * 5000),
    new Bomb(Math.random() * 500, Math.random() * 500, 'green', 5000 + Math.random() * 5000),
  ];

  constructor(private gameFacade: GameFacade) {
    super();
  }

  ngOnInit() {
    this.subscribeUntilDestroyed(this.gameFacade.getCapturedBomb(), (bomb: Bomb) => this.bomb = bomb);
  }

  removeBomb(bomb: Bomb) {
    this.bombs.splice(this.bombs.indexOf(bomb), 1);

    if (this.bomb === bomb) {
      this.gameFacade.releaseBomb();
    }

    this.gameFacade.degreaseScore();
  }

  captureBomb(bomb: Bomb) {
    this.gameFacade.captureBomb(bomb);
  }

  releaseBomb(bomb: Bomb) {
    this.gameFacade.releaseBomb();
  }
}
