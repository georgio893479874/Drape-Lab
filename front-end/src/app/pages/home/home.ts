import { Component, signal, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  protected readonly stats = signal([
    { label: 'Weekly style reach', value: '8.2K', detail: '+14% vs last week' },
    { label: 'New arrivals', value: '28', detail: 'Top-rated this week' },
    { label: 'Customer favorites', value: '18%', detail: 'Wishlists added' },
  ]);

  protected readonly chartData = signal([
    { label: 'Outerwear', value: 72, gradient: 'linear-gradient(90deg, #0f172a, #475569)' },
    { label: 'Dresses', value: 88, gradient: 'linear-gradient(90deg, #c2410c, #f97316)' },
    { label: 'Footwear', value: 64, gradient: 'linear-gradient(90deg, #0f766e, #2dd4bf)' },
    { label: 'Accessories', value: 53, gradient: 'linear-gradient(90deg, #0369a1, #38bdf8)' },
  ]);

  protected readonly products = signal<Product[]>([
    {
      id: '1',
      sku: 'DRL-001',
      name: 'Celeste Crystal Mini Dress',
      slug: 'celeste-crystal-mini-dress',
      description:
        'Statement mini dress adorned with shimmering crystal embellishments and sheer panel details. Designed to capture attention at cocktail parties, gala events, and exclusive evenings.',
      price: 289.99,
      mainImageUrl: '/woman-photo-4.webp',
      images: [],
      categoryId: 'dresses',
      isActive: true,
    },
    {
      id: '2',
      sku: 'DRL-002',
      name: 'Noir Elegance Dress',
      slug: 'noir-elegance-dress',
      description:
        'A timeless off-shoulder silhouette crafted for effortless sophistication. Featuring a sleek fit and subtle shimmer that transitions seamlessly from dinner events to formal occasions.',
      price: 149.99,
      mainImageUrl: '/woman-photo-5.webp',
      images: [],
      categoryId: 'dresses',
      isActive: true,
    },
    {
      id: '3',
      sku: 'DRL-003',
      name: 'Sapphire Velvet Gown',
      slug: 'sapphire-velvet-gown',
      description:
        'Luxurious velvet evening gown in a rich sapphire tone. The elegant side slit and matching gloves create a refined, red-carpet-inspired look.',
      price: 329.99,
      mainImageUrl: '/woman-photo-6.webp',
      images: [],
      categoryId: 'evening-wear',
      isActive: true,
    },
    {
      id: '4',
      sku: 'DRL-004',
      name: 'Midnight Stardust Couture',
      slug: 'midnight-stardust-couture',
      description:
        'An artistic couture gown featuring celestial-inspired embellishments, intricate beadwork, and a dramatic sculpted silhouette for unforgettable appearances.',
      price: 799.99,
      mainImageUrl: '/woman-photo-38.webp',
      images: [],
      categoryId: 'couture',
      isActive: true,
    },
    {
      id: '5',
      sku: 'DRL-005',
      name: 'Ruby Flame Evening Dress',
      slug: 'ruby-flame-evening-dress',
      description:
        'A bold evening masterpiece decorated with flowing crystal details and vibrant ruby tones. Crafted for confidence, glamour, and standout elegance.',
      price: 649.99,
      mainImageUrl: '/woman-photo-39.webp',
      images: [],
      categoryId: 'evening-wear',
      isActive: true,
    },
    {
      id: '6',
      sku: 'DRL-006',
      name: 'Obsidian Luxe Gown',
      slug: 'obsidian-luxe-gown',
      description:
        'Sophisticated black sequin gown featuring a deep neckline and dramatic thigh-high slit. A modern interpretation of classic luxury and evening glamour.',
      price: 459.99,
      mainImageUrl: '/woman-photo-40.webp',
      images: [],
      categoryId: 'evening-wear',
      isActive: true,
    },
  ]);

  @ViewChild('slides', { static: false }) private slidesRef!: ElementRef<HTMLDivElement>;
  private currentIndex = 0;
  private intervalId: any = null;
  private slideCount = 4;
  private isPaused = false;

  showLightbox = false;
  lightboxImage = '';

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.startSlider();
  }

  ngOnDestroy(): void {
    this.stopSlider();
  }

  private startSlider() {
    this.stopSlider();
    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.nextSlide();
      }
    }, 3500);
  }

  private stopSlider() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  pauseSlider() {
    this.isPaused = true;
  }

  resumeSlider() {
    this.isPaused = false;
  }

  private updateSlidePosition() {
    if (this.slidesRef && this.slidesRef.nativeElement) {
      const el = this.slidesRef.nativeElement as HTMLElement;
      this.renderer.setStyle(el, 'transform', `translateX(-${this.currentIndex * 100}%)`);
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slideCount;
    this.updateSlidePosition();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
    this.updateSlidePosition();
  }

  openLightbox(src: string) {
    this.lightboxImage = src;
    this.showLightbox = true;
  }

  closeLightbox() {
    this.showLightbox = false;
    this.lightboxImage = '';
  }
}
