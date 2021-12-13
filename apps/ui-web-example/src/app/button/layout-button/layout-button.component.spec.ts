import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LayoutButtonComponent } from './layout-button.component';

xdescribe('LayoutButtonComponent', () => {
  let component: LayoutButtonComponent;
  let fixture: ComponentFixture<LayoutButtonComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LayoutButtonComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
