import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'orc-composer-controls',
  templateUrl: './composer-controls.component.html',
  styleUrls: ['./composer-controls.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposerControlsComponent {}
