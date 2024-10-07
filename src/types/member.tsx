import { User } from "./user";

export type Member = {
  uuid: string;
  name: string;
  position: string;
  is_important: boolean;
  created_at: number;
  updated_at: number;
  user: User;
};
