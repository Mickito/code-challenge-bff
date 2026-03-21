import { Item, catalog, SKU } from "../catalog/catalog";
import { PricingRule } from "../rules";

export class Checkout {
  private cartItems: Map<SKU, number> = new Map<SKU, number>();
  private readonly pricingRules: PricingRule[];

  constructor(pricingRules: PricingRule[]) {
    this.pricingRules = pricingRules;
  }

  scan(item: Item): void {
    if (!catalog[item.sku]) throw new Error(`Cannot scan item: ${item.name}`);

    const quantity = this.cartItems.get(item.sku) ?? 0;
    this.cartItems.set(item.sku, quantity + 1);
  }

  total(): number {
    var totalDiscount = 0;
    for (const pricingRule of this.pricingRules) {
      totalDiscount += pricingRule.apply(this.cartItems);
    }

    var totalPrice = 0;
    this.cartItems.forEach((quantity, sku) => {
      const itemPrice = catalog[sku].price;
      totalPrice += itemPrice * quantity;
    });

    return Math.round((totalPrice - totalDiscount) * 100) / 100;
  }
}
