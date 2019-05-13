import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVotingComponent } from './new-voting.component';

describe('NewVotingComponent', () => {
  let component: NewVotingComponent;
  let fixture: ComponentFixture<NewVotingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVotingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
