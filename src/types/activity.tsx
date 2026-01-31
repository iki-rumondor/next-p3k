import { Member } from "./member";
import { User } from "./user";

export type Activity = {
  uuid: string;
  title: string;
  description: string;
  group: number;
  image_name: string;
  location: string;
  start_time: number;
  end_time: number;
  created_at: number;
  updated_at: number;
  members: Member[];
  created_user: User;
  updated_user: User;
};
