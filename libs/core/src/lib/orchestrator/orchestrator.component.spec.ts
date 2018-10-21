import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicModule } from 'ng-dynamic-component';

import { Dynamic1Component, Dynamic2Component } from '../../__test__/dynamic-components';
import { COMPONENT_MAP } from '../component-map';
import { RenderItemComponent } from '../render-item/render-item.component';
import { OrchestratorComponent } from './orchestrator.component';

describe('OrchestratorComponent', () => {
  let component: OrchestratorComponent;
  let fixture: ComponentFixture<OrchestratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DynamicModule.withComponents([Dynamic1Component, Dynamic2Component])],
      declarations: [
        OrchestratorComponent,
        RenderItemComponent,
        Dynamic1Component,
        Dynamic2Component,
      ],
      providers: [{ provide: COMPONENT_MAP, useValue: null }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrchestratorComponent);
    component = fixture.componentInstance;
  });

  it('should render `orc-render-item` with config => item prop', () => {
    component.config = 'my-config' as any;

    fixture.detectChanges();

    const renderItem = fixture.debugElement.query(By.directive(RenderItemComponent));

    expect(renderItem).toBeTruthy();
    expect(renderItem.componentInstance.item).toBe('my-config');
  });

  it('should emit `componentsCreated` with all dynamic component refs', () => {
    component.config = { component: Dynamic1Component, items: [{ component: Dynamic2Component }] };

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
