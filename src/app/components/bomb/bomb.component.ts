import {Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {fromEvent} from 'rxjs';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {MS_IN_SEC} from '../../pipes/ms.pipe';


const USE_HAMMER_JS = false;
const TICK_MS = 1000;
const SIZE_FACTOR = 20;
const TIMOUT_INDICATOR_SIZE_FACTOR = 3;
const TIMOUT_INDICATOR_FONT_SIZE_FACTOR = 1;

export class Bomb {
  get color(): Colors {
    return this._color;
  }

  get timeout(): number {
    return this._timeout;
  }

  constructor(
    public x: number,
    public y: number,
    // tslint:disable-next-line:variable-name
    private _color: Colors,
    // tslint:disable-next-line:variable-name
    private _timeout: number
  ) {}
}

@Component({
  selector: 'app-bomb',
  templateUrl: './bomb.component.html',
  styleUrls: ['./bomb.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[style.top.px]': 'bomb.y',
    '[style.left.px]': 'bomb.x',
    '(window:resize)': 'sizeToFactor()'
  }
})
export class BombComponent implements OnInit {

  @Input()
  bomb: Bomb;

  @Output()
  explode: EventEmitter<void> = new EventEmitter();

  @Output()
  capture: EventEmitter<void> = new EventEmitter();

  @Output()
  release: EventEmitter<void> = new EventEmitter();

  restTimeout: number;

  radius: number;
  timeoutIndicatorRadius: number;
  timeoutIndicatorFontSize: number;

  constructor(
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.sizeToFactor();

    if (USE_HAMMER_JS) {
      this.initHammerjs();
    } else {
      this.initNative();
    }

    this.initInterval();
  }

  private initInterval() {
    this.restTimeout = this.bomb.timeout;

    const interval = setInterval(() => {
      this.restTimeout = this.restTimeout - MS_IN_SEC;

      if (this.restTimeout <= 0) {
        clearInterval(interval);
        this.explode.emit();
      }
    }, TICK_MS);
  }

  private initNative() {
    const nativeElement = this.elementRef.nativeElement;

    const move$ = fromEvent(document, 'mousemove');
    const down$ = fromEvent(nativeElement, 'mousedown');
    const up$ = fromEvent(document, 'mouseup');

    let startX: number;
    let startY: number;

    down$.subscribe((event: MouseEvent) => {
      startX = event.offsetX;
      startY = event.offsetY;
      this.capture.emit();

      up$.subscribe(() => this.release.emit());
    });

    down$
      .pipe(
        mergeMap(() => move$.pipe(takeUntil(up$)))
      )
      .subscribe((event: MouseEvent) => {
        this.bomb.x = event.clientX - startX;
        this.bomb.y = event.clientY - startY;
      });
  }

  private initHammerjs() {
    const nativeElement = this.elementRef.nativeElement;

    const hammer = new Hammer(nativeElement);

    let startX: number;
    let startY: number;

    fromEvent(hammer, 'panstart').subscribe((event: any) => {
      startX = this.bomb.x;
      startY = this.bomb.y;

      this.capture.emit();
    });

    fromEvent(hammer, 'pan').subscribe((event: any) => {
      event.preventDefault();
      this.bomb.x = startX + event.deltaX;
      this.bomb.y = startY + event.deltaY;
    });

    fromEvent(hammer, 'panend').subscribe(() => this.release.emit());
  }

  private sizeToFactor() {
    this.radius = Math.min(window.innerHeight, window.innerWidth) / SIZE_FACTOR;
    this.timeoutIndicatorRadius = this.radius / TIMOUT_INDICATOR_SIZE_FACTOR;
    this.timeoutIndicatorFontSize = this.timeoutIndicatorRadius / TIMOUT_INDICATOR_FONT_SIZE_FACTOR;
  }

}
