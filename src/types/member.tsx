import { User } from "./user";

export type Member = {
  uuid: string;
  name: string;
  position: string;
  is_important: boolean;
  is_headgroup: boolean;
  created_at: number;
  updated_at: number;
  user: User;
};
