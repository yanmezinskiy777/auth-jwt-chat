export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

interface IUser {
  id: string;
  email: string;
  isActivated: string;
}
