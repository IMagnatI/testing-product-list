<template>
  <div class="v-productsListing">
    <template v-if="!isLoading">
      <h2>Best Sales</h2>
      <div class="bestSalesList">
        <ProductCard
          v-if="productOfADay"
          index="9999999"
          :product="productOfADay"
          :isProductOfADay="true"
        />
        <ProductCard
          v-for="(product, index) in bestSales"
          :index="index"
          :key="`bestSales${index}`"
          :product="product"
        />
      </div>
      <h2>Produkty rekomendowane dla Ciebie</h2>
      <div class="list">
        <ProductCard
          v-for="(product, index) in recommendedForYou"
          :index="index + 1000"
          :key="`recommended${index}`"
          :product="product"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import productService from "@/store/productService";
import { Nullable } from "@/types/Nullable";
import { IProduct } from "@/types/ProductTypes";
import ProductCard from "@/components/ProductCard.vue";

@Component({
  components: { ProductCard },
})
export default class ProductsListingView extends Vue {
  public async mounted(): Promise<void> {
    await productService.loadProducts();
  }

  public get isLoading(): boolean {
    return productService.isLoading;
  }

  public get productOfADay(): Nullable<IProduct> {
    return productService.productOfADay;
  }

  public get bestSales(): IProduct[] {
    return productService.bestSales;
  }

  public get recommendedForYou(): IProduct[] {
    return productService.recommendedForYou;
  }
}
</script>

<style lang="scss" scoped>
.bestSalesList,
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1460px;
  margin: 0 auto;
}
</style>
