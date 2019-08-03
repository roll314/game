import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BombsSpawnerComponent } from './bombs-spawner.component';

describe('BombsSpawnerComponent', () => {
  let component: BombsSpawnerComponent;
  let fixture: ComponentFixture<BombsSpawnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BombsSpawnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BombsSpawnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
