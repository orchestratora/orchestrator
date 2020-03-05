import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'orc-composer-config',
  templateUrl: './composer-config.component.html',
  styleUrls: ['./composer-config.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposerConfigComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
