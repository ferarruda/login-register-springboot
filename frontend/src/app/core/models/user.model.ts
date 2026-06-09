export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  userId: string;
  password: string;
}

export interface SessionUser {
  name?: string;
  email: string;
}
