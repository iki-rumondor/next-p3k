import { Umkm } from "./umkm";

export type Product = {
  uuid: string;
  name: string;
  price: number;
  stock: number;
  created_at: number;
  updated_at: number;
  shop: Umkm;
};
