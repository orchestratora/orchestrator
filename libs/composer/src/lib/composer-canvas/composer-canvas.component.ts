import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ComposerDroppableComponent } from '../composer-droppable';

@Component({
  selector: 'orc-composer-canvas',
  templateUrl: './composer-canvas.component.html',
  styleUrls: ['./composer-canvas.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposerCanvasComponent {
  initialConfig = ComposerDroppableComponent.wrapperConfig;
}
