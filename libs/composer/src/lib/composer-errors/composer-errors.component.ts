import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'orc-composer-errors',
  templateUrl: './composer-errors.component.html',
  styleUrls: ['./composer-errors.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposerErrorsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
