import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

/**
 * @internal
 */
@Component({
  selector: 'orc-composer-configurator',
  templateUrl: './composer-configurator.component.html',
  styleUrls: ['./composer-configurator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposerConfiguratorComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
