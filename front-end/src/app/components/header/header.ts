import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { heroArrowLeftOnRectangle, heroUserPlus } from '@ng-icons/heroicons/outline';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ heroArrowLeftOnRectangle, heroUserPlus })],
})
export class Header {
  @Input() showMenuButton = false;
  @Output() menuClick = new EventEmitter<void>();
}
