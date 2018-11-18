import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PirateIconComponent } from './pirate-icon.component';

describe('PirateIconComponent', () => {
  let component: PirateIconComponent;
  let fixture: ComponentFixture<PirateIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PirateIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PirateIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
