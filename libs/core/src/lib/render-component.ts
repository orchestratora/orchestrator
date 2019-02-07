import { InjectorRegistryService } from './injectors/injector-registry.service';
import { OrchestratorConfigItem } from './types';

export abstract class RenderComponent {
  abstract addItem(item: OrchestratorConfigItem<any>): void;
  abstract removeItem(item: OrchestratorConfigItem<any>): void;
  abstract clearItems(): void;
  abstract getInjectorRegistryService(): InjectorRegistryService;
}
