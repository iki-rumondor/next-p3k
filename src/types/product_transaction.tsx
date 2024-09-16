import { Product } from "./product";
import { User } from "./user";

export type ProductTransaction = {
  uuid: string;
  quantity: string;
  is_response: boolean;
  is_accept: boolean;
  created_at: number;
  updated_at: number;
  user: User;
  product: Product;
};
