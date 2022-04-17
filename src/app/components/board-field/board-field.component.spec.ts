import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardFieldComponent } from './board-field.component';

describe('BoardFieldComponent', () => {
  let component: BoardFieldComponent;
  let fixture: ComponentFixture<BoardFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
