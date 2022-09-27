export type ILoginUser = {
  email: string;
  password: string;
};
export interface IUserData {
  _id: string;
  fullname: string;
  email: string;
  token: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
export type IUserSlice = {
  data: IUserData | null;
  isLoading: boolean;
  error: string | null;
};
