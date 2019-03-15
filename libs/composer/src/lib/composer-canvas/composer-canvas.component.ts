import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'orc-composer-canvas',
  templateUrl: './composer-canvas.component.html',
  styleUrls: ['./composer-canvas.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposerCanvasComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
