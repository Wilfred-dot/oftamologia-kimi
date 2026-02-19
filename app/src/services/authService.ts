import { api } from './api';

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    nome: string;
    email: string;
    perfil: string;
  };
}

export interface ChangePasswordData {
  senhaAtual: string;
  novaSenha: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  async me() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  async changePassword(data: ChangePasswordData) {
    const response = await api.post('/auth/change-password', data);
    return response.data;
  },

  setToken(token: string) {
    localStorage.setItem('token', token);
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  removeToken() {
    localStorage.removeItem('token');
  },

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser(): any | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  removeUser() {
    localStorage.removeItem('user');
  },
};
