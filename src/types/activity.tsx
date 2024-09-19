import { Member } from "./member";
import { User } from "./user";

export type Activity = {
  uuid: string;
  title: string;
  description: string;
  image_name: string;
  created_at: number;
  updated_at: number;
  members: Member[];
  created_user: User;
  updated_user: User;
};
