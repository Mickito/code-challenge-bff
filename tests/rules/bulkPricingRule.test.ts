import { BulkPricingRule } from "../../src/rules/bulkPricingRule";
import { SKU, catalog } from "../../src/item";

describe("BulkPricingRule", () => {
  const DISCOUNT = 100;
  const THRESHOLD = 3;
  const bulkPricingRule = new BulkPricingRule(
    "ipd",
    THRESHOLD,
    catalog["ipd"].price - DISCOUNT
  );
  const createCart = (quantity: number) =>
    new Map<SKU, number>([["ipd", quantity]]);

  test.each([
    ["below threshold", THRESHOLD - 1, 0],
    ["at threshold", THRESHOLD, DISCOUNT * THRESHOLD],
    ["above threshold", THRESHOLD + 1, DISCOUNT * (THRESHOLD + 1)],
  ])(
    "should apply discount correctly when %s",
    (_, quantity, expectedDiscount) => {
      const totalDiscount = bulkPricingRule.apply(createCart(quantity));
      expect(totalDiscount).toBe(expectedDiscount);
    }
  );

  test("should throw error when threshold below 0", () => {
    expect(() => new BulkPricingRule("ipd", -1, 123.45)).toThrow;
  });

  test("should throw error when new price below 0", () => {
    expect(() => new BulkPricingRule("ipd", 2, -123.45)).toThrow;
  });
});
