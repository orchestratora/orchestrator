import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'orc-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
