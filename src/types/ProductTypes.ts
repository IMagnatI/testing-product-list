import { Nullable } from "@/types/Nullable";

export interface IPrice {
  regular: number;
  current: number;
}

export interface IBudges {
  new: boolean;
  "collection-sale": boolean;
  "last-items": boolean;
}

export interface IProduct {
  image: string;
  name: string;
  price: IPrice;
  amount: number;
  rating: number;
  badges: IBudges;
  "added-to-wishlist": boolean;
}

export interface IListingProducts {
  "product-of-a-day": Nullable<IProduct>;
  "best-sales": IProduct[];
  "recommended-for-you": IProduct[];
}

export interface IProductState {
  isError: boolean;
  isLoading: boolean;
  products: IListingProducts;
}
