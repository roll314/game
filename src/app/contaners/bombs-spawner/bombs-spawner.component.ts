import { Component, OnInit } from '@angular/core';
import {Bomb} from '../../components/bomb/bomb.component';

@Component({
  selector: 'app-bombs-spawner',
  templateUrl: './bombs-spawner.component.html',
  styleUrls: ['./bombs-spawner.component.scss']
})
export class BombsSpawnerComponent implements OnInit {

  bomb: Bomb;

  bombs = [
    new Bomb(Math.random() * 500, Math.random() * 500, 'red', 5000 + Math.random() * 5000),
    new Bomb(Math.random() * 500, Math.random() * 500, 'blue',5000 + Math.random() * 5000),
    new Bomb(Math.random() * 500, Math.random() * 500, 'green', 5000 + Math.random() * 5000),
  ];

  removeBomb(bomb: Bomb) {
    this.bombs.splice(this.bombs.indexOf(bomb), 1);
    this.bomb = null;
  }

  captureBomb(bomb: Bomb) {
    this.bomb = bomb;
  }

  releaseBomb(bomb: Bomb) {
    this.bomb = null;
  }

  constructor() { }

  ngOnInit() {
  }

}
