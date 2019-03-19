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
  components = this.componentLocator.getComponents();

  componentsInfo: ComponentFactory<OrchestratorDynamicComponent>[] = [];

  constructor(
    private componentLocator: ComponentLocatorService,
    private cfr: ComponentFactoryResolver,
  ) {}

  ngOnInit() {
    this.componentsInfo = this.components.map(comp =>
      this.cfr.resolveComponentFactory(comp),
    );
  }
}
