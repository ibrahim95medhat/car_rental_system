export const API_BASE_URL = 'https://task.abudiyab-soft.com/api';

export const API_ENDPOINTS = {
  // Admin Auth
  adminLogin: `${API_BASE_URL}/admin/login`,
  adminRegister: `${API_BASE_URL}/admin/register`,
  adminMe: `${API_BASE_URL}/admin/me`,
  adminLogout: `${API_BASE_URL}/admin/logout`,

  // Admin Resources
  adminUsers: `${API_BASE_URL}/admin/users`,
  adminCars: `${API_BASE_URL}/admin/cars`,
  adminOrders: `${API_BASE_URL}/admin/orders`,

  // Customer Auth
  customerLogin: `${API_BASE_URL}/customer/login`,
  customerRegister: `${API_BASE_URL}/customer/register`,
  customerMe: `${API_BASE_URL}/customer/me`,
  customerLogout: `${API_BASE_URL}/customer/logout`,

  // Customer Resources
  customerCars: `${API_BASE_URL}/customer/cars`,
  customerOrders: `${API_BASE_URL}/customer/orders`,
  customerInstallments: `${API_BASE_URL}/customer/installments`,
} as const;
