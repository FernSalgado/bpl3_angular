import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamLadderComponent } from './stream-ladder.component';

describe('StreamLadderComponent', () => {
  let component: StreamLadderComponent;
  let fixture: ComponentFixture<StreamLadderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamLadderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamLadderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
