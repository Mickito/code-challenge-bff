import { catalog, SKU } from "../catalog/catalog";
import { PricingRule } from "./pricing-rule";

export class BulkDiscount implements PricingRule {
  private readonly sku: SKU;
  private readonly discountThreshold: number;
  private readonly newPrice: number;

  constructor(sku: SKU, discountThreshold: number, newPrice: number) {
    if (!Number.isInteger(discountThreshold))
      throw new Error("discount threshold must be an integer");
    if (discountThreshold <= 0)
      throw new Error("discount threshold must be greater than 0");
    if (newPrice <= 0) throw new Error("new price must be greater than 0");
    if (newPrice >= catalog[sku].price)
      throw new Error(
        "new price must be lower than current selected item price"
      );

    this.sku = sku;
    this.discountThreshold = discountThreshold;
    this.newPrice = newPrice;
  }

  apply(items: Map<SKU, number>): number {
    const itemQuantity = items.get(this.sku) ?? 0;
    if (itemQuantity < this.discountThreshold) return 0;

    const currentPrice = catalog[this.sku].price;
    return Math.max(0, currentPrice - this.newPrice) * itemQuantity;
  }
}
