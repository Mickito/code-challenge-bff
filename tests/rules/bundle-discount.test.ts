import { BundleDiscount } from "../../src/rules";
import { SKU, catalog } from "../../src/catalog/catalog";

describe("BundleDiscount", () => {
  const createCart = (quantity: number) =>
    new Map<SKU, number>([[catalog.ipd.sku, quantity]]);

  test("should apply discount correctly", () => {
    const bundleDiscount = new BundleDiscount(catalog.ipd.sku, 3, 2);
    const totalDiscount = bundleDiscount.apply(createCart(3));
    expect(totalDiscount).toBeCloseTo(catalog.ipd.price);
  });

  test("should apply discount multiple times correctly", () => {
    const bundleDiscount = new BundleDiscount(catalog.ipd.sku, 3, 2);
    const totalDiscount = bundleDiscount.apply(createCart(8));
    expect(totalDiscount).toBeCloseTo(catalog.ipd.price * 2);
  });

  test("should not apply discount when not enough items in cart", () => {
    const bundleDiscount = new BundleDiscount(catalog.ipd.sku, 3, 2);
    const totalDiscount = bundleDiscount.apply(createCart(2));
    expect(totalDiscount).toBe(0);
  });

  test.each([
    ["bundle threshold", 12.3, 1],
    ["pay quantity", 12, 1.23],
    ["bundle threshold and pay quantity", 12.3, 1.2],
  ])(
    "should throw error when %s is not an integer",
    (_, bundleThreshold, payQuantity) => {
      expect(
        () => new BundleDiscount(catalog.ipd.sku, bundleThreshold, payQuantity)
      ).toThrow("bundle threshold or pay quantity must be an integer");
    }
  );

  test("should throw error when bundle threshold is below 0", () => {
    expect(() => new BundleDiscount(catalog.ipd.sku, -1, 2)).toThrow(
      "bundle threshold must be greater than 0"
    );
  });

  test("should throw error when pay quantity threshold is below 0", () => {
    expect(() => new BundleDiscount(catalog.ipd.sku, 2, 0)).toThrow(
      "pay quantity must be greater than 0"
    );
  });

  test("should throw error when pay quantity exceeds discount threshold", () => {
    expect(() => new BundleDiscount(catalog.ipd.sku, 2, 3)).toThrow(
      "pay quantity cannot exceed discount threshold"
    );
  });
});
