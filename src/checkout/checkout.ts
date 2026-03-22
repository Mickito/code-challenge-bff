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
    let totalDiscount = 0;
    for (const [sku, quantity] of this.cartItems.entries()) {
      const maxDiscountForSku = Math.max(
        0,
        ...this.pricingRules.map((rule) =>
          rule.apply(new Map([[sku, quantity]]))
        )
      );

      totalDiscount += maxDiscountForSku;
    }

    let totalPrice = Array.from(this.cartItems.entries()).reduce(
      (total, [sku, quantity]) => total + catalog[sku].price * quantity,
      0
    );

    return Math.round((totalPrice - totalDiscount) * 100) / 100;
  }
}
