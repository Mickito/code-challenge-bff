import { SKU } from "../catalog/catalog";

export interface PricingRule {
  apply(items: Map<SKU, number>): number;
}
