# @orchestrator/html-tag

> A component that allows to render any HTML elements for Orchestrator library.

![@orchestrator/html-tag](https://img.shields.io/npm/v/@orchestrator/html-tag)

## Registration

```ts
import { NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';
import { HtmlTagModule } from '@orchestrator/html-tag';

@NgModule({
  imports: [OrchestratorCoreModule.forRoot(), HtmlTagModule.forRoot()],
})
export class AppModule {}
```

## Components list

| Component                                                             | Description |
| --------------------------------------------------------------------- | ----------- |
| [orc-html-tag](/libs/html-tag/src/lib/html-tag/html-tag-config.ts)    | Html Tag    |
| [orc-html-text](/libs/html-tag/src/lib/html-text/html-text-config.ts) | HTML Text   |
|                                                                       |             |
