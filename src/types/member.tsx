import { User } from "./user";

export type Member = {
  uuid: string;
  name: string;
  group: string;
  created_at: number;
  updated_at: number;
  user: User;
};
