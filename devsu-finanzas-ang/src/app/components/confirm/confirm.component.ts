import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  @Input() message: string;
  @Input() dato: string;
  @Output() onConfirm = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  confirm() {
    this.onConfirm.emit(this.dato);
  }

  cancel() {
    this.onCancel.emit();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.cancel();
    }
  }

}
