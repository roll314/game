import {Component, Input, OnInit} from '@angular/core';

const SIZE_FACTOR = 5;

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
  color: Colors;

  size: number;

  constructor() { }

  ngOnInit() {
    this.sizeToFactor();
  }

  private sizeToFactor() {
    this.size = Math.min(window.innerHeight, window.innerWidth) / SIZE_FACTOR;
  }

}
