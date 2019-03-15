import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'orc-composer-preview',
  templateUrl: './composer-preview.component.html',
  styleUrls: ['./composer-preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposerPreviewComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
