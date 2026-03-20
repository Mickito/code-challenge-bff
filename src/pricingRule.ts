import { Item } from "./item";

export interface PricingRule {
  apply(items: Item[]): number;
}
