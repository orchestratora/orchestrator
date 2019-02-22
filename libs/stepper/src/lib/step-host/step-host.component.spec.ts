/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StepHostComponent } from './step-host.component';

describe('StepHostComponent', () => {
  let component: StepHostComponent;
  let fixture: ComponentFixture<StepHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
