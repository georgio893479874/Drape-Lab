import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const productResolver: ResolveFn<any> = (route) => {
  const http = inject(HttpClient);

  return http.get(
    `${environment.apiUrl}/products/${route.paramMap.get('id')}`
  );
};