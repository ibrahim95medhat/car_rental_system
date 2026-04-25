import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../../core/config/api.config';
import { ApiService } from '../../../core/services/api/api.service';
import {
  LoginPayload,
  RegisterPayload,
  AuthUser,
  ApiResponse,
} from '../../../core/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(ApiService);

  login(payload: LoginPayload, role: 'admin' | 'customer') {
    const url =
      role === 'admin' ? API_ENDPOINTS.adminLogin : API_ENDPOINTS.customerLogin;
    return this.api.post<ApiResponse<AuthUser>>(url, payload);
  }

  register(payload: RegisterPayload, role: 'admin' | 'customer') {
    const url =
      role === 'admin'
        ? API_ENDPOINTS.adminRegister
        : API_ENDPOINTS.customerRegister;
    return this.api.post<ApiResponse<AuthUser>>(url, payload);
  }

  logout(role: 'admin' | 'customer') {
    const url =
      role === 'admin'
        ? API_ENDPOINTS.adminLogout
        : API_ENDPOINTS.customerLogout;
    return this.api.post<void>(url);
  }

  fetchMe(role: 'admin' | 'customer') {
    const url =
      role === 'admin' ? API_ENDPOINTS.adminMe : API_ENDPOINTS.customerMe;
    return this.api.get<ApiResponse<AuthUser>>(url);
  }
}
