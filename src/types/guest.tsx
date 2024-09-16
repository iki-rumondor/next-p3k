import { User } from "./user";

export type Guest = {
  uuid: string;
  name: string;
  address: string;
  phone_number: string;
  created_at: number;
  updated_at: number;
  user: User;
};
