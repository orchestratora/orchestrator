import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { removeFnPad, stringify } from '../../util';

interface ObjectEntry<T> {
  kind: string;
  value: T;
  prop: string;
  str: string;
  children?: ObjectEntry<any>[];
}

@Component({
  selector: 'orc-display-config',
  templateUrl: './display-config.component.html',
  styleUrls: ['./display-config.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayConfigComponent {
  @Input()
  set config(val: Object) {
    this.configStr = stringify(val);
    this.entry = this.objToEntries(val);
  }

  configStr: string;

  entry: ObjectEntry<any>;

  showAsInput = false;

  private objToEntries(obj: any, name?: string): ObjectEntry<any> {
    if (obj === null || obj === undefined) {
      return { kind: 'Empty', value: obj, prop: name, str: 'Empty' };
    }

    switch (typeof obj) {
      case 'boolean':
      case 'number':
      case 'string':
      case 'symbol':
        return {
          kind: obj.constructor.name,
          value: obj,
          prop: name,
          str: String(obj),
        };
      case 'function':
        return {
          kind: obj.constructor.name,
          value: obj,
          prop: name,
          str: removeFnPad(String(obj)),
        };
      case 'object':
        if (Array.isArray(obj)) {
          return {
            kind: 'Array',
            value: obj,
            prop: name,
            str: stringify(obj),
            children: obj.map((o, i) => this.objToEntries(o, String(i))),
          };
        } else {
          return {
            kind: 'Object',
            value: obj,
            prop: name,
            str: stringify(obj),
            children: Object.keys(obj).map(k => this.objToEntries(obj[k], k)),
          };
        }
      default:
        return { kind: 'Unknown', value: obj, prop: name, str: String(obj) };
    }
  }
}
