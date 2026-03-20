import { PricingRule } from "../pricingRule";

export class BundlePricingRule implements PricingRule {
  private sku: string;
  private quantity: number;
  private chargedQuantity: number;

  constructor(sku: string, quantity: number, chargedQuantity: number) {
    this.sku = sku;
    this.quantity = quantity;
    this.chargedQuantity = chargedQuantity;
  }

  apply(items: Item[]): number {
    return 0;
  }
}
