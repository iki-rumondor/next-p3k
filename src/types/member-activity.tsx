import { Activity } from "./activity";
import { Member } from "./member";

export type MemberActivity = {
  uuid: string;
  is_accept: string;
  attendance_image: string;
  created_at: number;
  updated_at: number;
  member: Member;
  activity: Activity;
};
