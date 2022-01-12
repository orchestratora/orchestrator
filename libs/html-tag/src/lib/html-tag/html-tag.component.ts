import {
  ChangeDetectionStrategy,
  Component,
  Input,
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
  tagContentVcr?: ViewContainerRef;

  /** @internal */
  @ViewChild('contentTpl', { static: true })
  contentTpl?: TemplateRef<void>;

  private attrsDiffer = this.keyValDiffers.find({}).create<string, string>();
  private hostElement: unknown = this.vcr.element.nativeElement;
  private tagName?: string;
  private tagElement?: unknown;

  constructor(
    private vcr: ViewContainerRef,
    private renderer: Renderer2,
    private keyValDiffers: KeyValueDiffers,
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
      this.tagContentVcr?.element.nativeElement,
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
    const changes = this.attrsDiffer.diff(this.config?.attributes ?? {});

    if (!changes || this.tagElement === undefined) {
      return;
    }

    changes.forEachAddedItem((change) =>
      this.setAttr(change.key, change.currentValue),
    );

    changes.forEachChangedItem((change) =>
      this.setAttr(change.key, change.currentValue),
    );

    changes.forEachRemovedItem((change) => this.removeAttr(change.key));
  }

  private setAttr(key: string, value?: string | null) {
    this.renderer.setAttribute(this.tagElement, key, value ?? '');
  }

  private removeAttr(key: string) {
    this.renderer.removeAttribute(this.tagElement, key);
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
      !this.tagContentVcr ||
      !this.contentTpl
    ) {
      return;
    }

    const item = this.items?.[0];

    if (!item) {
      this.tagContentVcr.clear();
      return;
    }

    this.tagContentVcr.createEmbeddedView(this.contentTpl);
  }
}
