/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AllowedValuesComponent } from './allowed-values.component';

// TODO(alex): Implement unit tests for AllowedValuesComponent
xdescribe('AllowedValuesComponent', () => {
  let component: AllowedValuesComponent;
  let fixture: ComponentFixture<AllowedValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllowedValuesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowedValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
