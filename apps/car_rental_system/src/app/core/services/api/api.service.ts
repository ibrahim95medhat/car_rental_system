import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);

  get<T>(
    url: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          httpParams = httpParams.set(key, String(value));
        }
      });
    }
    return this.http.get<T>(url, { params: httpParams });
  }

  post<T>(url: string, body: unknown = {}): Observable<T> {
    return this.http.post<T>(url, body);
  }

  put<T>(url: string, body: unknown = {}): Observable<T> {
    return this.http.put<T>(url, body);
  }

  patch<T>(url: string, body: unknown = {}): Observable<T> {
    return this.http.patch<T>(url, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
