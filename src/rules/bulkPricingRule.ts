import { Item } from "../item";
import { PricingRule } from "../pricingRule";

export class BulkPricingRule implements PricingRule {
  private sku: string;
  private threshold: number;
  private newPrice: number;

  constructor(sku: string, threshold: number, newPrice: number) {
    this.sku = sku;
    this.threshold = threshold;
    this.newPrice = newPrice;
  }

  apply(items: Map<string, number>, catalog: Map<string, Item>): number {
    const quantity = items.get(this.sku) ?? 0;
    if (quantity >= this.threshold) {
      const currentPrice = catalog.get(this.sku)?.price ?? 0;

      return Math.max(0, currentPrice - this.newPrice) * quantity;
    }

    return 0;
  }
}
