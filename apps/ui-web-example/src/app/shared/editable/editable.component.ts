import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'orc-editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() value: string;

  @Input() isEditing = false;

  @Input() isMultiline = false;

  @Input() selectEditable = true;

  @Input()
  @HostBinding('class.blocked')
  blockEditing = false;

  @Input() rows = 15;

  @ViewChild('inputElem', { read: ElementRef })
  inputElem: ElementRef;

  ngOnInit(): void {
    this.updateMultiline();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('value' in changes) {
      this.updateMultiline();
    }

    if ('blockEditing' in changes && this.blockEditing) {
      this.toggle();
    }
  }

  ngAfterViewChecked(): void {
    if (this.inputElem) {
      this.inputElem.nativeElement.focus();

      if (this.selectEditable) {
        this.inputElem.nativeElement.setSelectionRange(0, this.value.length);
      }
    }
  }

  toggle(state: boolean = !this.isEditing) {
    this.isEditing = this.blockEditing ? false : state;
  }

  private updateMultiline() {
    this.isMultiline = /\n/.test(this.value);

    if (this.isMultiline && this.value) {
      const lines = this.value.match(/(\n)/g) || [];
      this.rows = (lines.length || this.rows) + 2;
    }
  }
}
