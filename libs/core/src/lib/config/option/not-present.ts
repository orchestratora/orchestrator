import { Property } from '@orchestrator/gen-io-ts';
import { null as nullType, undefined as undefinedType, union } from 'io-ts';

import { addConfig } from '../../metadata/configuration';

/**
 * Will set type of property to `null | undefined`.
 *
 * Useful for cases when you have to explicitly exclude
 * specific property from type.
 *
 * **Example:**
 * ```ts
 * class A {
 *   @Option()
 *   prop1: string;
 *   @Option()
 *   prop2: string;
 *   @OptionNotPresent()
 *   prop3?: null | undefined; // This prop should be excluded!
 * }
 *
 * class B {
 *   @Option()
 *   prop1: string;
 *   @Option()
 *   prop2: string;
 *   @Option()
 *   prop3: string;
 * }
 *
 * type AorB = A | B;
 * ```
 */
export function OptionNotPresent(): PropertyDecorator {
  const decorator = Property({
    typeFactory: () => union([nullType, undefinedType]),
  });
  return (target, prop) => {
    decorator(target, prop);
    addConfig(target, { prop, decorator: OptionNotPresent, args: [] });
  };
}
