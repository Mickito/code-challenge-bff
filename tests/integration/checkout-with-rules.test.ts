import { Checkout } from "../../src/checkout/checkout";
import { catalog } from "../../src/catalog/catalog";
import { BundleDiscount, BulkDiscount } from "../../src/rules";

describe("Checkout with Pricing Rules ", () => {
  test("Should calculate total correctly for bundle discount", () => {
    const atvBundleDiscount = new BundleDiscount(catalog.atv.sku, 3, 2);
    const co = new Checkout([atvBundleDiscount]);
    co.scan(catalog.atv);
    co.scan(catalog.atv);
    co.scan(catalog.atv);
    expect(co.total()).toBeCloseTo(catalog.atv.price * 2);
  });

  test("Should calculate total correctly for bulk discount", () => {
    const ipdBulkDiscount = new BulkDiscount(catalog.ipd.sku, 4, 499.99);
    const co = new Checkout([ipdBulkDiscount]);
    co.scan(catalog.ipd);
    co.scan(catalog.ipd);
    co.scan(catalog.ipd);
    co.scan(catalog.ipd);
    co.scan(catalog.ipd);
    expect(co.total()).toBeCloseTo(499.99 * 5);
  });

  test("should apply biggest discount per SKU when discounts for same item exist", () => {
    const atvBundleDiscount = new BundleDiscount(catalog.atv.sku, 3, 2);
    const atvBulkDiscount = new BulkDiscount(catalog.atv.sku, 3, 10.1);
    const mbpBulkDiscount = new BulkDiscount(catalog.mbp.sku, 3, 1);
    const co = new Checkout([
      atvBundleDiscount,
      atvBulkDiscount,
      mbpBulkDiscount,
    ]);
    co.scan(catalog.atv);
    co.scan(catalog.atv);
    co.scan(catalog.atv);
    co.scan(catalog.mbp);
    co.scan(catalog.mbp);
    co.scan(catalog.mbp);

    expect(co.total()).toBeCloseTo(33.3);
  });
});
