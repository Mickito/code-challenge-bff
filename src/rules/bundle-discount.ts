import { catalog, SKU } from "../catalog/catalog";
import { PricingRule } from "./pricing-rule";

export class BundleDiscount implements PricingRule {
  private readonly sku: SKU;
  private readonly bundleThreshold: number;
  private readonly payQuantity: number;

  constructor(sku: SKU, bundleThreshold: number, payQuantity: number) {
    if (!Number.isInteger(bundleThreshold) || !Number.isInteger(payQuantity))
      throw new Error("bundle threshold or pay quantity must be an integer");
    if (bundleThreshold <= 0)
      throw new Error("bundle threshold must be greater than 0");
    if (payQuantity <= 0)
      throw new Error("pay quantity must be greater than 0");
    if (payQuantity > bundleThreshold)
      throw new Error("pay quantity cannot exceed discount threshold");

    this.sku = sku;
    this.bundleThreshold = bundleThreshold;
    this.payQuantity = payQuantity;
  }

  apply(cartItems: Map<SKU, number>): number {
    const itemQuantity = cartItems.get(this.sku) ?? 0;
    if (itemQuantity >= this.bundleThreshold) {
      const bundleGroups = Math.floor(itemQuantity / this.bundleThreshold);
      const freeItems = this.bundleThreshold - this.payQuantity;
      const itemPrice = catalog[this.sku].price ?? 0;

      return bundleGroups * freeItems * itemPrice;
    }

    return 0;
  }
}
