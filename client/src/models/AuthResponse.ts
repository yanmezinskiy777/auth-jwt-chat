export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IUser {
  id: string;
  email: string;
  isActivated: boolean;
}
