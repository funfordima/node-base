export interface IUserRoom {
  index: number | string;
  name: string;
  password: string;
  error?: boolean;
  errorText?: string;
}
