import { InjectorRegistryService } from './injectors/injector-registry.service';
import { OrchestratorConfigItem } from './types';

/**
 * Abstract component type that is responsible to render dynamic component
 */
export abstract class RenderComponent {
  /**
   * Mark for check dynamic component
   */
  abstract markForCheck(): void;

  /**
   * Add new item to dynamic component `items` property
   * causing it to render new component if supported by component
   */
  abstract addItem(item: OrchestratorConfigItem<any>): void;

  /**
   * Remove item from dynamic component `item` property
   * causing it to remove rendered component from view
   */
  abstract removeItem(item: OrchestratorConfigItem<any>): void;

  /**
   * Remove all dynamic components from view
   */
  abstract clearItems(): void;

  /**
   * Get {@link InjectorRegistryService} to manage injector resolution
   */
  abstract getInjectorRegistryService(): InjectorRegistryService;
}
