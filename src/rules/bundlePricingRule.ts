import { Item } from "../item";
import { PricingRule } from "../pricingRule";

export class BundlePricingRule implements PricingRule {
  private sku: string;
  private threshold: number;
  private chargedQuantity: number;

  constructor(sku: string, threshold: number, chargedQuantity: number) {
    this.sku = sku;
    this.threshold = threshold;
    this.chargedQuantity = chargedQuantity;
  }

  apply(items: Map<string, number>, catalog: Map<string, Item>): number {
    const quantity = items.get(this.sku) ?? 0;
    if (quantity > this.threshold) {
      const itemPrice = catalog.get(this.sku)?.price ?? 0;

      return itemPrice * quantity - itemPrice * this.chargedQuantity;
    }

    return 0;
  }
}
