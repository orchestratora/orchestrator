import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DisplayConfigComponent } from './display-config.component';

xdescribe('DisplayConfigComponent', () => {
  let component: DisplayConfigComponent;
  let fixture: ComponentFixture<DisplayConfigComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DisplayConfigComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
