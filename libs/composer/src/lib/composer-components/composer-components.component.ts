import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'orc-composer-components',
  templateUrl: './composer-components.component.html',
  styleUrls: ['./composer-components.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposerComponentsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
