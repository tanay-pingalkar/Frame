export interface tokenData {
  register?: subTokenData;
  login?: subTokenData;
  googleLogin?: subTokenData;
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
}

export interface userAction extends action {
  payload?: user;
}

export interface frame {
  likeNumber: number;
  isLiked: boolean;
  frame: {
    title: string;
    frame: string;
    description: string;
    user: user;
    id: string;
  };
}

export type frames = Array<frame>;

export interface getFramesType {
  getFrames: frames;
}

export type isAuth = "nolog" | "logging" | "logged";
export interface state {
  isAuth: isAuth;
  userInfo: {
    id: string;
    name: string;
    email: string;
  };
}
export type setStateString = (value: React.SetStateAction<string>) => void;
export type setStateJsx = (value: React.SetStateAction<boolean>) => void;

export interface reduxState {
  isAuth: isAuth;
  userInfo: user;
}
