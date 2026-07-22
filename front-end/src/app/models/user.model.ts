export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'CUSTOMER' | 'MANAGER' | 'ADMIN';
  createdAt: Date;
  token?: string;
}
