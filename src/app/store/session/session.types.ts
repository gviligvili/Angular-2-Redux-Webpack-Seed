export interface IUser {
  firstName: string;
  lastName: string;
};

export interface ISession {
  token: string;
  user: IUser;
  hasError: boolean;
  isLoading: boolean;
};
