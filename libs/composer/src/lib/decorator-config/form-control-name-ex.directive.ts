import { Directive, Input } from '@angular/core';
import { ControlContainer, FormControlName } from '@angular/forms';

/**
 * This is a fix directive for {@link FormControlName} directive.
 *
 * It extends from the base and allows to specify parent {@link ControlContainer}
 * via input `formControlNameEx` - so that it can cross dynamic boundary
 * that static DI compiler not able to do.
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[formControlNameEx]',
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class FormControlNameEx extends FormControlName {
  @Input('formControlNameEx') name: string;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('formControlNameExParent') _parent: ControlContainer;
}
