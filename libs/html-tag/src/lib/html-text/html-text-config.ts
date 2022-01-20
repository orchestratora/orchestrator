import { Injectable } from '@angular/core';
import { Option } from '@orchestrator/core';

@Injectable({ providedIn: 'root' })
export class HtmlTextConfig {
  @Option()
  text?: string;
}
