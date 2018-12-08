import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UiWebImageHostComponent } from './ui-web-image-host.component';

describe('UiWebImageHostComponent', () => {
  let component: UiWebImageHostComponent;
  let fixture: ComponentFixture<UiWebImageHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiWebImageHostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiWebImageHostComponent);
    component = fixture.componentInstance;
  });

  it('should render img with src from `config.src`', () => {
    component.config = { src: 'my-src' };

    fixture.detectChanges();

    const imgElem = getImgElem();

    expect(imgElem).toBeTruthy();
    expect(imgElem.properties['src']).toBe('my-src');
  });

  it('should set width of img from `config.width`', () => {
    component.config = { src: 'my-src', width: 123 };

    fixture.detectChanges();

    const imgElem = getImgElem();

    expect(imgElem.properties['width']).toBe(123);
  });

  it('should set height of img from `config.height`', () => {
    component.config = { src: 'my-src', heigh: 45 };

    fixture.detectChanges();

    const imgElem = getImgElem();

    expect(imgElem.properties['height']).toBe(45);
  });

  it('should set alt attribute of img from `config.alt`', () => {
    component.config = { src: 'my-src', alt: 'description' };

    fixture.detectChanges();

    const imgElem = getImgElem();

    expect(imgElem.attributes['alt']).toBe('description');
  });

  function getImgElem() {
    return fixture.debugElement.query(By.css('img'));
  }
});
