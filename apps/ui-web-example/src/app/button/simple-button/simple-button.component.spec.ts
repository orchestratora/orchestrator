/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SimpleButtonComponent } from './simple-button.component';

xdescribe('SimpleButtonComponent', () => {
  let component: SimpleButtonComponent;
  let fixture: ComponentFixture<SimpleButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleButtonComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
