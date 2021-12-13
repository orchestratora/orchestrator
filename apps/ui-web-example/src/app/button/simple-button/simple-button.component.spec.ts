import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SimpleButtonComponent } from './simple-button.component';

xdescribe('SimpleButtonComponent', () => {
  let component: SimpleButtonComponent;
  let fixture: ComponentFixture<SimpleButtonComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SimpleButtonComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
