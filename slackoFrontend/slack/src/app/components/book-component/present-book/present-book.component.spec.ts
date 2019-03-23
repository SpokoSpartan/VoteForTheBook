import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentBookComponent } from './present-book.component';

describe('PresentBookComponent', () => {
  let component: PresentBookComponent;
  let fixture: ComponentFixture<PresentBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
