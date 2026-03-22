import { SKU } from "../catalog/catalog";

export interface PricingRule {
  apply(cartItems: Map<SKU, number>): number;
}
