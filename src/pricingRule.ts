import { Item } from "./item";

export interface PricingRule {
  apply(items: Map<string, number>, catalog: Map<string, Item>): number;
}
