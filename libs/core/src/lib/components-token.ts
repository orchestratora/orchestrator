import { InjectionToken } from '@angular/core';

import { ComponentRegistry } from './component-registry';

/**
 * Holds all available components for orchestrator
 * @internal
 */
export const COMPONENTS = new InjectionToken<ComponentRegistry[]>('COMPONENTS');
