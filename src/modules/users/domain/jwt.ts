export interface JWTClaims {
  userId: string;
  isEmailVerified: boolean;
  email: string;
  username: string;
  adminUser: boolean;
  managerUser: boolean;
}

export type JWTToken = string;

export type SessionId = string;

export type RefreshToken = string;
