import { Item } from "../item";

export class Checkout {
  private items: Item[] = [];
  private pricingRules: PricingRules;

  constructor(pricingRules: PricingRules) {
    this.pricingRules = pricingRules;
  }

  scan(item: Item): void {
    this.items.push(item);
  }

  total(): number {
    return parseFloat(
      this.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)
    );
  }
}
