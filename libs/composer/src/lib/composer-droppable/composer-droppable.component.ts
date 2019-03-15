import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

/**
 * @internal
 */
@Component({
  selector: 'orc-composer-droppable',
  templateUrl: './composer-droppable.component.html',
  styleUrls: ['./composer-droppable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposerDroppableComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
