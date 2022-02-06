import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  Dynamic1Component,
  Dynamic2Component,
  provideDynamicComponents,
} from '@orchestrator/core/testing';
import {
  DynamicAttributesModule,
  DynamicDirectivesModule,
  DynamicModule,
} from 'ng-dynamic-component';
import { ComponentLocatorService } from '../component-locator/component-locator.service';
import { COMPONENTS } from '../components-token';
import { ConfigurationService } from '../config/configuration.service';
import { ErrorStrategy } from '../error-strategy/error-strategy';
import { SuppressErrorStrategy } from '../error-strategy/suppress-error-strategy';
import { provideInjectorMap } from '../injectors/mapped-injector';
import { RenderItemComponent } from '../render-item/render-item.component';
import { OrchestratorComponent } from './orchestrator.component';

describe('OrchestratorComponent', () => {
  let component: OrchestratorComponent;
  let fixture: ComponentFixture<OrchestratorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicModule,
          DynamicAttributesModule,
          DynamicDirectivesModule,
        ],
        declarations: [
          OrchestratorComponent,
          RenderItemComponent,
          Dynamic1Component,
          Dynamic2Component,
        ],
        providers: [
          provideDynamicComponents([Dynamic1Component, Dynamic2Component]),
          { provide: COMPONENTS, useValue: null, multi: true },
          ComponentLocatorService,
          ConfigurationService,
          { provide: ErrorStrategy, useClass: SuppressErrorStrategy },
          provideInjectorMap({}),
        ],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrchestratorComponent);
    component = fixture.componentInstance;
  });

  it('should render `orc-render-item` with config => item prop', () => {
    component.config = 'my-config' as any;

    fixture.detectChanges();

    const renderItem = fixture.debugElement.query(
      By.directive(RenderItemComponent),
    );

    expect(renderItem).toBeTruthy();
    expect(renderItem.componentInstance.item).toBe('my-config');
  });

  it('should render `orc-render-item` with context => context prop', () => {
    component.context = 'some-context';

    fixture.detectChanges();

    const renderItem = fixture.debugElement.query(
      By.directive(RenderItemComponent),
    );

    expect(renderItem).toBeTruthy();
    expect(renderItem.componentInstance.context).toBe('some-context');
  });

  it('should emit `componentsCreated` with all dynamic component refs', () => {
    component.config = {
      component: Dynamic1Component,
      items: [{ component: Dynamic2Component }],
    };

    const callback = jest.fn();
    component.componentsCreated.subscribe(callback);

    fixture.detectChanges();

    expect(callback).toHaveReturnedTimes(1);
    expect(callback).toHaveBeenCalledWith([
      expect.objectContaining({ instance: expect.any(Dynamic1Component) }),
      expect.objectContaining({ instance: expect.any(Dynamic2Component) }),
    ]);
  });
});
