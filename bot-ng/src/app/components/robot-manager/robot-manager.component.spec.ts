import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotManagerComponent } from './robot-manager.component';

describe('RobotManagerComponent', () => {
  let component: RobotManagerComponent;
  let fixture: ComponentFixture<RobotManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobotManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
