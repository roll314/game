import { Component } from '@angular/core';


const COLORS = <const> ['red', 'blue', 'green', 'gray', 'pink'];

type Colors = typeof COLORS[number];

class Bomb {
  private readonly TICK_MS = 1000;

  private _restTimeout: number;

  public get restTimeout(): number {
    return this._restTimeout;
  }



  constructor(
    public x: number,
    public y: number,
    public color: Colors,
    private timeout: number,
    public onExplode: (bomb: Bomb) => void
  ) {
    this._restTimeout = timeout;

    const interval = setInterval(() => {
      this._restTimeout--;

      if (this._restTimeout === 0) {
        clearInterval(interval);
        this.onExplode(this);
      }
    }, this.TICK_MS);
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'game';

  bombs = [
    new Bomb(Math.random() * 500, Math.random() * 500, 'red', 5000 + Math.random() * 5000, this.removeBomb.bind(this)),
    new Bomb(Math.random() * 500, Math.random() * 500, 'blue',5000 + Math.random() * 5000, this.removeBomb.bind(this)),
    new Bomb(Math.random() * 500, Math.random() * 500, 'green', 5000 + Math.random() * 5000, this.removeBomb.bind(this)),
  ];


  startX = 0;
  startY = 0;

  onPanStart(event: any, bomb: Bomb): void {
    this.startX = bomb.x;
    this.startY = bomb.y;
  }

  onPan(event: any, bomb: Bomb): void {
    event.preventDefault();
    bomb.x = this.startX + event.deltaX;
    bomb.y = this.startY + event.deltaY;
  }

  private removeBomb(bomb: Bomb) {
    this.bombs.splice(this.bombs.indexOf(bomb), 1);
  }
}
