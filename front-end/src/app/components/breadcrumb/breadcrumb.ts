import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './breadcrumb.html',
})
export class Breadcrumb {
  breadcrumbs: { label: string; url: string }[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.breadcrumbs = [];
      this.buildBreadcrumbs(this.activatedRoute.root);
    });
  }

  private buildBreadcrumbs(route: ActivatedRoute, url: string = '') {
    const children = route.children;

    if (!children.length) {
      return;
    }

    for (const child of children) {
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      const routeUrl = child.snapshot.url.map((segment) => segment.path).join('/');

      if (routeUrl) {
        url += `/${routeUrl}`;
      }

      let label = child.snapshot.data['breadcrumb'];

      // якщо це сторінка товару
      if (!label && child.snapshot.data['product']) {
        label = child.snapshot.data['product'].name;
      }

      if (label) {
        this.breadcrumbs.push({
          label,
          url,
        });
      }

      this.buildBreadcrumbs(child, url);
      return;
    }
  }
}
