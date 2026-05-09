export type AdminUser = {
  email: string;
  id: string;
  name: string;
  role: 'super_admin' | 'admin';
};

export type AdminAuthTokens = {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  tokenType: 'Bearer';
};

export type LoginResponse = {
  tokens: AdminAuthTokens;
  user: AdminUser;
};
