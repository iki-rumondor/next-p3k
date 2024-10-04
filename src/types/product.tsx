import { Umkm } from "./umkm";

export type Product = {
  uuid: string;
  category_name: string;
  name: string;
  price: number;
  stock: number;
  unit: string;
  image_name: string;
  created_at: number;
  updated_at: number;
  shop: Umkm;
};
