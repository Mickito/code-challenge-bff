import { Item, catalog, SKU } from "../catalog/catalog";
import { PricingRule } from "../rules";

export class Checkout {
  private cartItems: Map<SKU, number> = new Map<SKU, number>();

  constructor(private readonly pricingRules: PricingRule[]) {}

  scan(item: Item): void {
    if (!catalog[item.sku]) throw new Error(`Cannot scan item: ${item.name}`);

    const quantity = this.cartItems.get(item.sku) ?? 0;
    this.cartItems.set(item.sku, quantity + 1);
  }

  total(): number {
    let totalDiscount = this.pricingRules.reduce(
      (total, rule) => total + rule.apply(this.cartItems),
      0
    );

    let totalPrice = Array.from(this.cartItems.entries()).reduce(
      (total, [sku, quantity]) => total + catalog[sku].price * quantity,
      0
    );

    return Math.round((totalPrice - totalDiscount) * 100) / 100;
  }
}
