import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './footer.html',
})
export class Footer {
  @Output() subscribeClicked = new EventEmitter<void>();
  onSubscribe() {
    this.subscribeClicked.emit();
  }

  username = '';
}
