export interface tokenData {
  register?: subTokenData;
  login?: subTokenData;
}
export interface authData {
  auth?: {
    ErrorMsg: string | null;
    user: user;
  };
}
interface user {
  id?: number;
  name?: string;
  email?: string;
}
interface subTokenData {
  ErrorMsg: string | null;
  token: string | null;
}
