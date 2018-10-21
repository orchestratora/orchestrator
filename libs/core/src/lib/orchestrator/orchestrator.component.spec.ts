import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicModule } from 'ng-dynamic-component';

import { COMPONENT_MAP } from '../component-map';
import { RenderItemComponent } from '../render-item/render-item.component';
import { OrchestratorComponent } from './orchestrator.component';

describe('OrchestratorComponent', () => {
  let component: OrchestratorComponent;
  let fixture: ComponentFixture<OrchestratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DynamicModule.withComponents([])],
      declarations: [OrchestratorComponent, RenderItemComponent],
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
});
