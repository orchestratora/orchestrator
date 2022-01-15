import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'orc-composer-errors',
  templateUrl: './composer-errors.component.html',
  styleUrls: ['./composer-errors.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposerErrorsComponent {}
