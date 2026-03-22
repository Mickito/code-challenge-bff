import { BulkDiscount } from "../../../src/rules";
import { SKU, catalog } from "../../../src/catalog/catalog";

describe("BulkDiscount", () => {
  const DISCOUNT = 100;
  const THRESHOLD = 3;
  const bulkDiscount = new BulkDiscount(
    catalog.ipd.sku,
    THRESHOLD,
    catalog[catalog.ipd.sku].price - DISCOUNT
  );
  const createCart = (quantity: number) =>
    new Map<SKU, number>([[catalog.ipd.sku, quantity]]);

  test.each([
    ["correctly when below threshold", THRESHOLD - 1, 0],
    ["correctly when at threshold", THRESHOLD, DISCOUNT * THRESHOLD],
    [
      "correctly when above threshold",
      THRESHOLD + 1,
      DISCOUNT * (THRESHOLD + 1),
    ],
  ])(
    "should apply discount correctly when %s",
    (_, quantity, expectedDiscount) => {
      const totalDiscount = bulkDiscount.apply(createCart(quantity));
      expect(totalDiscount).toBeCloseTo(expectedDiscount);
    }
  );

  test("should throw error when discount threshold is not an integer", () => {
    expect(() => new BulkDiscount(catalog.ipd.sku, 12.3, 123.45)).toThrow(
      "discount threshold must be an integer"
    );
  });

  test("should throw error when discount threshold is below 0", () => {
    expect(() => new BulkDiscount(catalog.ipd.sku, -1, 123.45)).toThrow(
      "discount threshold must be greater than 0"
    );
  });

  test("should throw error when new price is below 0", () => {
    expect(() => new BulkDiscount(catalog.ipd.sku, 2, -123.45)).toThrow(
      "new price must be greater than 0"
    );
  });

  test.each([
    ["above current price", catalog[catalog.ipd.sku].price + 1234],
    ["equal to current price", catalog[catalog.ipd.sku].price],
  ])("should throw error when new price is %s", (_, newPrice) => {
    expect(() => new BulkDiscount(catalog.ipd.sku, 2, newPrice)).toThrow(
      "new price must be lower than current selected item price"
    );
  });
});
