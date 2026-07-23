import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
})
export class Gallery {
  showLightbox = false;
  lightboxImage = '';

  openLightbox(src: string) {
    this.lightboxImage = src;
    this.showLightbox = true;
  }

  closeLightbox() {
    this.showLightbox = false;
    this.lightboxImage = '';
  }
}
