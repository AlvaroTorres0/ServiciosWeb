import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PianoappComponent } from './pianoapp.component';

describe('PianoappComponent', () => {
  let component: PianoappComponent;
  let fixture: ComponentFixture<PianoappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PianoappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PianoappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
