import { Item } from "../item";
import { PricingRule } from "../pricingRule";

export class Checkout {
  private cartItems: Map<string, number> = new Map<string, number>();
  private catalog: Map<string, Item> = new Map<string, Item>();
  private pricingRules: PricingRule[];

  constructor(pricingRules: PricingRule[]) {
    this.pricingRules = pricingRules;
  }

  scan(item: Item): void {
    this.catalog.set(item.sku, item);
    var quantity = this.cartItems.get(item.sku) ?? 0;
    this.cartItems.set(item.sku, quantity + 1);
  }

  total(): number {
    var totalDiscount = 0;
    for (const pricingRule of this.pricingRules) {
      totalDiscount += pricingRule.apply(this.cartItems, this.catalog);
    }

    var totalPrice = 0;
    this.cartItems.forEach((quantity, sku) => {
      const itemPrice = this.catalog.get(sku)?.price ?? 0;
      totalPrice += itemPrice * quantity;
    });

    return totalPrice - totalDiscount;
  }
}
