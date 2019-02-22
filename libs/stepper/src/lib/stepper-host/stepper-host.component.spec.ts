/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StepperHostComponent } from './stepper-host.component';

describe('StepperHostComponent', () => {
  let component: StepperHostComponent;
  let fixture: ComponentFixture<StepperHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
