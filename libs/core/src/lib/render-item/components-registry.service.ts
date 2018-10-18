import { ComponentRef, Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ComponentsRegistryService implements OnDestroy {
  private _componentsReady$ = new Subject<ComponentRef<any>[]>();
  componentsReady$ = this._componentsReady$.asObservable();

  private count: number;
  private childComponents: ComponentRef<any>[] = [];
  private subChildComponents: ComponentRef<any>[] = [];

  constructor() {}

  ngOnDestroy(): void {
    this.childComponents = null;
    this.subChildComponents = null;
  }

  waitFor(count: number) {
    this.count = count;
    this.childComponents = [];
    this.subChildComponents = [];
  }

  addChild(compRef: ComponentRef<any> | null | undefined) {
    this.childComponents.push(compRef);
  }

  addSubChildren(compRefs: ComponentRef<any>[]) {
    this.subChildComponents.push(...compRefs);

    if (this.childComponents.length >= this.count) {
      this._componentsReady$.next(
        this.childComponents.concat(this.subChildComponents).filter(Boolean),
      );
    }
  }
}
