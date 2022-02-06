# @orchestrator/core

> Core package of Orchestrator library.

![@orchestrator/core](https://img.shields.io/npm/v/@orchestrator/core)

It is providing capabilities to render UIs dynamically from a JSON like configurations
using Angular components that are registered with it.

## Usage

### Create dynamic component

First you should create some component that you want to be able to render.

To do that - just decorate your component with `@DynamicComponent` decorator
and pass an object with required class that describes it's configuration
and use interface `OrchestratorDynamicComponent` that describes inputs:

```ts
import { Component, Input } from '@angular/core';
import {
  DynamicComponent,
  OrchestratorDynamicComponent,
  Option,
} from '@orchestrator/core';

export class YourComponentConfig {
  @Option()
  title?: string;
}

@Component({
  selector: 'your-dynamic-component',
  template: `Title is {{ config?.title }}`,
})
@DynamicComponent({ config: YourComponentConfig })
export class YourDynamicComponent
  implements OrchestratorDynamicComponent<YourComponentConfig>
{
  @Input()
  items?: OrchestratorConfigItem<any>[];
  @Input()
  config?: YourComponentConfig;
  @Input()
  context?: any;
}
```

- `config` input is a config validated at runtime of your component
  that is provided via the JSON like config for each component
- `context` input is any object that is passed down as a context from the top
- `items` input contains further children of a JSON like subtree
  that your component may or may not decide to render

### Register dynamic component

Next, you should tell Orchestrator which components are available for render.

To do that - just call `OrchestratorCoreModule.withComponents([...])`
with your components in your application module:

```ts
import { NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';
import { YourDynamicComponent } from './your-dynamic.component.ts';

@NgModule({
  imports: [OrchestratorCoreModule.withComponents([YourDynamicComponent])],
})
export class AppModule {}
```

### Render dynamic UI

Finally you are ready to render UI dynamically using `<orc-orchestrator>` component
and passing to it JSON like configuration of your UI:

```ts
import { Component } from '@angular/core';
import { OrchestratorConfigItem } from '@orchestrator/core';

@Component({
  template: `<orc-orchestrator [config]="config"></orc-orchestrator>`,
})
export class MyComponent {
  config: OrchestratorConfigItem<any> = {
    component: 'your-dynamic-component',
    config: { title: 'Dynamic title' },
  };
}
```
