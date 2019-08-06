/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IntegerComponent } from './integer.component';

describe('IntegerComponent', () => {
  let component: IntegerComponent;
  let fixture: ComponentFixture<IntegerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
