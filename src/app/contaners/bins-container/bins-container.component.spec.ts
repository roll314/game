import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BinsContainerComponent} from './bins-container.component';

describe('BinComponent', () => {
  let component: BinsContainerComponent;
  let fixture: ComponentFixture<BinsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BinsContainerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
