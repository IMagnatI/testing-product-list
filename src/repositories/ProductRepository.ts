import axios from "axios";
import { IListingProducts } from "@/types/ProductTypes";
import { Nullable } from "@/types/Nullable";
import { API_URL } from "@/consts/data";

class ProductRepository {
  public async loadProducts(): Promise<Nullable<IListingProducts>> {
    return await axios
      .get(`${API_URL}/products`)
      .then((response) => {
        return response.data ?? null;
      })
      .catch((error) => {
        throw error;
      });
  }
}

export default new ProductRepository();
