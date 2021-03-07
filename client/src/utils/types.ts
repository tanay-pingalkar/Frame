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
export interface user {
  id?: number;
  name?: string;
  email?: string;
}
export interface subTokenData {
  ErrorMsg: string | null;
  token: string | null;
}

export interface action {
  type: string;
  payload?: any;
}

export interface userAction extends action {
  payload?: user;
}
