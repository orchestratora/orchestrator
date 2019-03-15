import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'orc-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
