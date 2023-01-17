import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import store from "./index";
import {
  IListingProducts,
  IProduct,
  IProductState,
} from "@/types/ProductTypes";
import { Nullable } from "@/types/Nullable";
import ProductRepository from "@/repositories/ProductRepository";

@Module
class ProductService extends VuexModule {
  public stateProduct: IProductState = {
    isError: false,
    isLoading: true,
    products: {
      "product-of-a-day": null,
      "best-sales": [],
      "recommended-for-you": [],
    },
  };

  @Mutation
  public setIsError(isError: boolean) {
    this.stateProduct.isError = isError;
  }

  @Mutation
  public setIsLoading(isLoading: boolean) {
    this.stateProduct.isLoading = isLoading;
  }

  @Mutation
  public setListingProducts(products: IListingProducts) {
    this.stateProduct.products = products;
  }

  public get isError(): boolean {
    return this.stateProduct.isError;
  }

  public get isLoading(): boolean {
    return this.stateProduct.isLoading;
  }

  public get products(): IListingProducts {
    return this.stateProduct.products;
  }

  public get productOfADay(): Nullable<IProduct> {
    return this.stateProduct.products["product-of-a-day"];
  }

  public get bestSales(): IProduct[] {
    return this.stateProduct.products["best-sales"];
  }

  public get recommendedForYou(): IProduct[] {
    return this.stateProduct.products["recommended-for-you"];
  }

  @Action
  public async loadProducts(): Promise<void> {
    this.setIsLoading(true);

    await ProductRepository.loadProducts()
      .then((productsListing) => {
        if (productsListing) {
          this.setListingProducts(productsListing);
        } else {
          this.setListingProducts({
            "product-of-a-day": null,
            "best-sales": [],
            "recommended-for-you": [],
          });
        }
        this.setIsError(false);
      })
      .catch(() => {
        this.setIsError(true);
      })
      .finally(() => {
        this.setIsLoading(false);
      });
  }
}

const productService = new ProductService({ store, name: "productService" });
export default productService;
