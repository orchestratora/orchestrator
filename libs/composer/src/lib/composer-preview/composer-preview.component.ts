import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'orc-composer-preview',
  templateUrl: './composer-preview.component.html',
  styleUrls: ['./composer-preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposerPreviewComponent {}
