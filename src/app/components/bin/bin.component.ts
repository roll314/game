import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fromEvent} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Colors} from '../../settings';

const SIZE_FACTOR = 5;

export class Bin {
  constructor(public color: Colors) {
  }
}

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '(window:resize)': 'sizeToFactor()'
  }
})
export class BinComponent implements OnInit {

  @Input()
  bin: Bin;

  @Input()
  isActive: boolean;

  @Output()
  mouseIn: EventEmitter<void> = new EventEmitter();

  @Output()
  mouseOut: EventEmitter<void> = new EventEmitter();

  size: number;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.sizeToFactor();

    const mousemove$ = fromEvent(document, 'mousemove');

    mousemove$
      .pipe(filter((event: MouseEvent) => !this.isOnSelf(event)))
      .subscribe((event: MouseEvent) => {
        this.mouseOut.emit();
      });

    mousemove$
      .pipe(filter((event: MouseEvent) => this.isOnSelf(event)))
      .subscribe((event: MouseEvent) => {
        this.mouseIn.emit();
      });
  }

  private isOnSelf(event: MouseEvent): boolean {
    const nativeElement: HTMLElement = this.elementRef.nativeElement;

    const rect: ClientRect = nativeElement.getBoundingClientRect();

    return event.clientY > rect.top &&
      event.clientY < rect.bottom &&
      event.clientX > rect.left &&
      event.clientX < rect.right;
  }

  private sizeToFactor() {
    this.size = Math.min(window.innerHeight, window.innerWidth) / SIZE_FACTOR;
  }

}
