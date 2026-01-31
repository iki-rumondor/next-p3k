import { User } from "./user";

export type Citizen = {
  uuid: string;
  name: string;
  address: string;
  nik: string;
  phone_number: string;
  created_at: number;
  updated_at: number;
  user: User;
  region: {
    name: string;
  };
};
