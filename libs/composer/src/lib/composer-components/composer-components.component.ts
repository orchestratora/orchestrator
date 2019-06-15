import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  OnInit,
} from '@angular/core';
import {
  ComponentLocatorService,
  OrchestratorDynamicComponent,
} from '@orchestrator/core';

@Component({
  selector: 'orc-composer-components',
  templateUrl: './composer-components.component.html',
  styleUrls: ['./composer-components.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposerComponentsComponent implements OnInit {
  componentsInfo: ComponentFactory<OrchestratorDynamicComponent>[] = [];

  constructor(
    private componentLocator: ComponentLocatorService,
    private cfr: ComponentFactoryResolver,
  ) {}

  ngOnInit() {
    this.componentsInfo = this.componentLocator
      .getComponents()
      .map(comp => this.cfr.resolveComponentFactory(comp))
      .filter(({ selector }) => !selector.startsWith('orc-composer'));
  }
}
