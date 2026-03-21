import { catalog, SKU } from "../item";
import { PricingRule } from "../pricingRule";

export class BulkPricingRule implements PricingRule {
  private readonly sku: SKU;
  private readonly thresholdQuantity: number;
  private readonly newPrice: number;

  constructor(sku: SKU, thresholdQuantity: number, newPrice: number) {
    if (thresholdQuantity <= 0)
      throw new Error("threshold must be greater than 0");
    if (newPrice <= 0) throw new Error("new price must be > 0");

    this.sku = sku;
    this.thresholdQuantity = thresholdQuantity;
    this.newPrice = newPrice;
  }

  apply(items: Map<string, number>): number {
    const quantity = items.get(this.sku) ?? 0;
    if (quantity < this.thresholdQuantity) return 0;

    const currentPrice = catalog[this.sku].price;
    return Math.max(0, currentPrice - this.newPrice) * quantity;
  }
}
