# @orchestrator/ui-web

> A set of basic HTML elements as components for Orchestrator library.

![@orchestrator/ui-web](https://img.shields.io/npm/v/@orchestrator/ui-web)

**DEPRECATED!**

> Please use [`@orchestrator/html-tag`](/libs/html-tag) package instead
> which has more streamlined API and allows to render any HTML tags available in the Web.

## Registration

```ts
import { NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';
import { UiWebModule } from '@orchestrator/ui-web';

@NgModule({
  imports: [OrchestratorCoreModule.forRoot(), UiWebModule.forRoot()],
})
export class AppModule {}
```

## Components list

| Component                                                                                                  | Description              |
| ---------------------------------------------------------------------------------------------------------- | ------------------------ |
| [orc-ui-web-button-host](/libs/ui-web/src/lib/components/ui-web-button-host/ui-web-button-config.ts)       | Button element           |
| [orc-ui-web-heading-host](/libs/ui-web/src/lib/components/ui-web-heading-host/ui-web-heading-config.ts)    | Heading element (h1..h6) |
| [orc-ui-web-image-host](/libs/ui-web/src/lib/components/ui-web-image-host/ui-web-image-config.ts)          | Image element            |
| [orc-ui-web-input-host](/libs/ui-web/src/lib/components/ui-web-input-host/ui-web-input-config.ts)          | Input element            |
| [orc-ui-web-select-host](/libs/ui-web/src/lib/components/ui-web-select-host/ui-web-select-config.ts)       | Select element           |
| [orc-ui-web-text-host](/libs/ui-web/src/lib/components/ui-web-text-host/ui-web-text-config.ts)             | Paragraph element        |
| [orc-ui-web-textarea-host](/libs/ui-web/src/lib/components/ui-web-textarea-host/ui-web-textarea-config.ts) | Paragraph element        |
|                                                                                                            |                          |
