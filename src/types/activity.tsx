import { Member } from "./member";
import { User } from "./user";

export type Activity = {
  uuid: string;
  title: string;
  description: string;
  group: number;
  image_name: string;
  created_at: number;
  updated_at: number;
  members: Member[];
  created_user: User;
  updated_user: User;
};
