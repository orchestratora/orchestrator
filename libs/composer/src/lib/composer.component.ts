import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'orc-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposerComponent {
  sideWidth = 250;
}
