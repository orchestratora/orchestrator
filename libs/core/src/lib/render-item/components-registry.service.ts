import {
  ComponentRef,
  Injectable,
  OnDestroy,
  Optional,
  SkipSelf,
} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ComponentsRegistryService implements OnDestroy {
  private _componentsReady$ = new Subject<ComponentRef<any>[]>();
  componentsReady$ = this._componentsReady$.asObservable();

  private count: number;
  private childComponents: ComponentRef<any>[] = [];
  private subChildComponents: ComponentRef<any>[] = [];

  constructor(
    @SkipSelf()
    @Optional()
    private parentComponentsRegistryService: ComponentsRegistryService,
  ) {}

  ngOnDestroy(): void {
    this.childComponents = null;
    this.subChildComponents = null;
  }

  waitFor(count: number) {
    this.count = count;
    this.childComponents = [];
    this.subChildComponents = [];
  }

  add(compRef: ComponentRef<any>) {
    if (this.parentComponentsRegistryService) {
      this.parentComponentsRegistryService.addChild(compRef);

      if (this.count === 0) {
        this.parentComponentsRegistryService.addSubChildren([]);
      }
    }
  }

  addChildren(compRefs: ComponentRef<any>[]) {
    if (this.parentComponentsRegistryService) {
      this.parentComponentsRegistryService.addSubChildren(compRefs);
    }
  }

  addChild(compRef: ComponentRef<any> | null | undefined) {
    this.childComponents.push(compRef);
  }

  addSubChildren(compRefs: ComponentRef<any>[]) {
    this.subChildComponents = this.subChildComponents.concat(compRefs);

    if (this.childComponents.length >= this.count) {
      this._componentsReady$.next(
        this.childComponents.concat(this.subChildComponents).filter(Boolean),
      );
    }
  }
}
