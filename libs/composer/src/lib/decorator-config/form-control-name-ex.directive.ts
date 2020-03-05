/* tslint:disable */
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
  selector: '[formControlNameEx]',
})
export class FormControlNameEx extends FormControlName {
  @Input('formControlNameEx') name: string;
  @Input('formControlNameExParent') _parent: ControlContainer;
}
