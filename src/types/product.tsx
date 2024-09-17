import { Umkm } from "./umkm";

export type Product = {
  uuid: string;
  name: string;
  price: number;
  stock: number;
  image_name: string;
  created_at: number;
  updated_at: number;
  shop: Umkm;
};
