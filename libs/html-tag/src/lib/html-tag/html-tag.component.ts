import {
  ChangeDetectionStrategy,
  Component,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  OnDestroy,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  DynamicComponent,
  OrchestratorConfigItem,
  OrchestratorDynamicComponent,
} from '@orchestrator/core';
import { HtmlTagConfig } from './html-tag-config';

interface TrackRecord<T> {
  differ: KeyValueDiffer<string, T>;
  getRecord(): Record<string, T> | undefined;
  set(name: string, value: T): void;
  remove(name: string): void;
}

@Component({
  selector: 'orc-html-tag',
  templateUrl: './html-tag.component.html',
  styleUrls: ['./html-tag.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@DynamicComponent({ config: HtmlTagConfig })
export class HtmlTagComponent
  implements OrchestratorDynamicComponent<HtmlTagConfig>, OnChanges, OnDestroy
{
  @Input() items?: OrchestratorConfigItem<unknown>[];
  @Input() config?: HtmlTagConfig;

  /** @internal */
  @ViewChild('tagContentAnchor', { static: true, read: ViewContainerRef })
  readonly _tagContentVcr?: ViewContainerRef;

  /** @internal */
  @ViewChild('contentTpl', { static: true })
  readonly _contentTpl?: TemplateRef<void>;

  private readonly objectDiffer = this.keyValDiffers.find({});

  private readonly hostElement: unknown = this.vcr.element.nativeElement;

  private readonly trackRecordsMap = {
    attributes: {
      differ: this.objectDiffer.create<string, string>(),
      getRecord: () => this.config?.attributes,
      set: (name, value) => this.setAttr(name, value),
      remove: (name) => this.removeAttr(name),
    } as TrackRecord<string>,
    properties: {
      differ: this.objectDiffer.create<string, unknown>(),
      getRecord: () => this.config?.properties,
      set: (name, value) => this.setProp(name, value),
      remove: (name) => this.setProp(name, undefined),
    } as TrackRecord<unknown>,
  };

  private tagName?: string;
  private tagElement?: unknown;

  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly renderer: Renderer2,
    private readonly keyValDiffers: KeyValueDiffers,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('config' in changes) {
      this.updateTag();
    }

    if ('items' in changes) {
      this.updateItems();
    }
  }

  ngOnDestroy(): void {
    this.clearTag();
  }

  getElement() {
    return this.tagElement;
  }

  private clearTag() {
    this.tagName = undefined;
    this.tagElement = undefined;
  }

  private updateTag() {
    if (!this.config?.tag) {
      this.removeTag();
      return;
    }

    if (this.tagName !== this.config.tag) {
      this.createTag();
    }

    this.updateAttrs();
    this.updateProps();
    this.updateContent();
  }

  private createTag() {
    if (!this.config?.tag) {
      return;
    }

    this.tagName = this.config.tag;
    this.tagElement = this.renderer.createElement(
      this.config.tag,
      this.config.namespace,
    );

    this.renderer.appendChild(
      this.tagElement,
      this._tagContentVcr?.element.nativeElement,
    );

    this.renderer.appendChild(this.hostElement, this.tagElement);
  }

  private removeTag() {
    if (this.tagElement === undefined) {
      return;
    }

    this.renderer.removeChild(this.hostElement, this.tagElement);
    this.clearTag();
  }

  private updateAttrs() {
    this.updateRecord(this.trackRecordsMap.attributes);
  }

  private updateProps() {
    this.updateRecord(this.trackRecordsMap.properties);
  }

  private updateRecord<T>(trackMap: TrackRecord<T>) {
    const changes = trackMap.differ.diff(trackMap.getRecord());

    if (!changes || this.tagElement === undefined) {
      return;
    }

    changes.forEachAddedItem((change) =>
      trackMap.set(change.key, change.currentValue),
    );

    changes.forEachChangedItem((change) =>
      trackMap.set(change.key, change.currentValue),
    );

    changes.forEachRemovedItem((change) => trackMap.remove(change.key));
  }

  private setAttr(key: string, value?: string | null) {
    this.renderer.setAttribute(this.tagElement, key, value ?? '');
  }

  private removeAttr(key: string) {
    this.renderer.removeAttribute(this.tagElement, key);
  }

  private setProp(key: string, value: unknown) {
    this.renderer.setProperty(this.tagElement, key, value);
  }

  private updateContent() {
    if (this.config?.text) {
      this.renderer.setProperty(
        this.tagElement,
        'textContent',
        this.config?.text,
      );
    } else if (this.config?.html) {
      this.renderer.setProperty(
        this.tagElement,
        'innerHTML',
        this.config?.html,
      );
    }
  }

  private updateItems() {
    if (
      this.tagElement === undefined ||
      !this._tagContentVcr ||
      !this._contentTpl
    ) {
      return;
    }

    const item = this.items?.[0];

    if (!item) {
      this._tagContentVcr.clear();
      return;
    }

    this._tagContentVcr.createEmbeddedView(this._contentTpl);
  }
}
