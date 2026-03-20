import { PricingRule } from "../pricingRule";

export class BulkDiscountRule implements PricingRule {
  private sku: string;
  private threshold: number;
  private newPrice: number;

  constructor(sku: string, threshold: number, newPrice: number) {
    this.sku = sku;
    this.threshold = threshold;
    this.newPrice = newPrice;
  }

  apply(items: Item[]): number {
    return 0;
  }
}
