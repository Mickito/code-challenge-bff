import { catalog, SKU } from "../catalog/catalog";
import { PricingRule } from "./pricing-rule";

export class BundleDiscount implements PricingRule {
  private readonly sku: SKU;
  private readonly discountThreshold: number;
  private readonly payQuantity: number;

  constructor(sku: SKU, discountThreshold: number, payQuantity: number) {
    if (discountThreshold <= 0)
      throw new Error("threshold must be greater than 0");
    if (payQuantity <= 0) throw new Error("Charged quantity must be > 0");
    if (payQuantity > discountThreshold)
      throw new Error("Charged quantity cannot exceed threshold");

    this.sku = sku;
    this.discountThreshold = discountThreshold;
    this.payQuantity = payQuantity;
  }

  apply(items: Map<string, number>): number {
    const itemQuantity = items.get(this.sku) ?? 0;
    if (itemQuantity >= this.discountThreshold) {
      const itemPrice = catalog[this.sku].price ?? 0;
      const discountGroups = Math.floor(itemQuantity / this.discountThreshold);

      return (
        (itemPrice * itemQuantity - itemPrice * this.payQuantity) *
        discountGroups
      );
    }

    return 0;
  }
}
