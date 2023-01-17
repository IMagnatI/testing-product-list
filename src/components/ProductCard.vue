<template>
  <div class="c-productCard" :class="{ isProductOfADay: isProductOfADay }">
    <div class="wishlist">
      <button @click="toggleWishList()">
        <img
          class="star"
          :src="product['added-to-wishlist'] ? 'star-fill.svg' : 'star.svg'"
        />
      </button>
    </div>
    <p class="title-isProductOfADay" v-if="isProductOfADay">PRODUKT DNIA</p>
    <img :src="`${product.image}?${index}`" :alt="product.name" />
    <div class="content">
      <div class="raiting">
        <img class="star" v-for="index in 5" :key="index" :src="star(index)" />
        <p>{{ product.rating }}/5</p>
      </div>
      <div class="badges">
        <p class="badge new" v-if="isNew">NEW</p>
        <p class="badge sale" v-if="isCollectionSale">SALE</p>
        <p class="badge last" v-if="isLastItems">OSTATNIE SZTUKI</p>
      </div>
      <p class="title">{{ product.name }}</p>
      <p class="amount">Ilość: {{ product.amount }}</p>
      <p class="price">
        Cena:
        <span :class="{ sale: isSale }">{{ product.price.current }} zł</span>
        <span class="regular" v-if="isSale"
          >{{ product.price.regular }} zł</span
        >
      </p>
    </div>
    <button class="addToCart">Dodaj do koszyka</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { IProduct } from "@/types/ProductTypes";

@Component
export default class ProductCard extends Vue {
  @Prop({ required: true })
  public product!: IProduct;

  @Prop({ default: false })
  public isProductOfADay!: boolean;

  @Prop({ default: 0 })
  public index!: number;

  public star(index: number): string {
    return this.product.rating >= index ? "star-fill.svg" : "star.svg";
  }

  public get isSale(): boolean {
    return this.product.price.current < this.product.price.regular;
  }

  public get isNew(): boolean {
    return this.product.badges.new;
  }

  public get isCollectionSale(): boolean {
    return this.product.badges["collection-sale"];
  }

  public get isLastItems(): boolean {
    return this.product.badges["last-items"];
  }

  public toggleWishList(): void {
    this.product["added-to-wishlist"] = !this.product["added-to-wishlist"];
  }
}
</script>

<style lang="scss" scoped>
.c-productCard {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  max-width: 95%;
  margin: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.isProductOfADay {
  background-color: #ee403570;
}

.title-isProductOfADay {
  color: #ffd954;
  font-weight: bold;
  font-size: 1.2rem;
}

.title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.raiting {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;

  p {
    margin: 3px 10px;
    font-weight: bold;
  }
}

.star {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.amount {
  text-align: left;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.badge {
  border: 1px solid #000;
  margin-right: 15px;
  margin-bottom: 10px;
  padding: 5px;

  &.sale {
    border-color: #ff0000;
    color: #ff0000;
  }

  &.last {
    border-color: #0000ff;
    color: #0000ff;
  }
}

.price {
  font-weight: bold;

  .sale {
    color: #ff0000;
  }

  .regular {
    margin-left: 10px;
    text-decoration: line-through;
    font-size: 0.8rem;
  }
}

.wishlist {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  position: absolute;
  top: 22px;
  right: 22px;
  z-index: 2;

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  .star {
    width: 35px;
    height: 35px;
  }
}

.addToCart {
  background-color: #2196f3;
  color: #fff;
  border: none;
  padding: 10px;
  margin-top: auto;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #2196f370;
  }
}
</style>
