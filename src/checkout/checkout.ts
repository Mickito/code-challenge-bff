import { Item, catalog, SKU } from "../item";
import { PricingRule } from "../pricingRule";

export class Checkout {
  private cartItems: Map<SKU, number> = new Map<SKU, number>();
  private pricingRules: PricingRule[];

  constructor(pricingRules: PricingRule[]) {
    this.pricingRules = pricingRules;
  }

  scan(item: Item): void {
    var quantity = this.cartItems.get(item.sku) ?? 0;
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

    return totalPrice - totalDiscount;
  }
}
