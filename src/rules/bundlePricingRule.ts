import { catalog, SKU } from "../item";
import { PricingRule } from "../pricingRule";

export class BundlePricingRule implements PricingRule {
  private readonly sku: SKU;
  private readonly thresholdQuantity: number;
  private readonly chargedQuantity: number;

  constructor(sku: SKU, thresholdQuantity: number, chargedQuantity: number) {
    if (thresholdQuantity <= 0)
      throw new Error("threshold must be greater than 0");
    if (chargedQuantity <= 0) throw new Error("Charged quantity must be > 0");
    if (chargedQuantity > thresholdQuantity)
      throw new Error("Charged quantity cannot exceed threshold");

    this.sku = sku;
    this.thresholdQuantity = thresholdQuantity;
    this.chargedQuantity = chargedQuantity;
  }

  apply(items: Map<string, number>): number {
    const quantity = items.get(this.sku) ?? 0;
    if (quantity > this.thresholdQuantity) {
      const itemPrice = catalog[this.sku].price ?? 0;
      return itemPrice * quantity - itemPrice * this.chargedQuantity;
    }

    return 0;
  }
}
