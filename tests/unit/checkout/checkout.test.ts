import { Checkout } from "../../../src/checkout/checkout";
import { catalog, Item } from "../../../src/catalog/catalog";

describe("Checkout", () => {
  test("should scan and calculate total correctly", () => {
    const checkout = new Checkout([]);
    checkout.scan(catalog.ipd);
    checkout.scan(catalog.atv);
    checkout.scan(catalog.mbp);
    checkout.scan(catalog.vga);

    expect(checkout.total()).toBeCloseTo(
      catalog.ipd.price +
        catalog.atv.price +
        catalog.mbp.price +
        catalog.vga.price
    );
  });

  test("should be able to handle multiple of the same item", () => {
    const checkout = new Checkout([]);
    checkout.scan(catalog.ipd);
    checkout.scan(catalog.ipd);
    checkout.scan(catalog.ipd);

    expect(checkout.total()).toBeCloseTo(catalog.ipd.price * 3);
  });

  test("should have a total of 0 if no items scanned", () => {
    const checkout = new Checkout([]);
    expect(checkout.total()).toBe(0);
  });

  test("should not care about order items are scanned", () => {
    const checkout1 = new Checkout([]);
    checkout1.scan(catalog.ipd);
    checkout1.scan(catalog.atv);
    checkout1.scan(catalog.mbp);
    checkout1.scan(catalog.vga);

    const checkout2 = new Checkout([]);
    checkout2.scan(catalog.vga);
    checkout2.scan(catalog.atv);
    checkout2.scan(catalog.ipd);
    checkout2.scan(catalog.mbp);

    expect(checkout1.total()).toBeCloseTo(checkout2.total());
  });

  test("should throw error if invalid item passed in", () => {
    const checkout = new Checkout([]);
    const invalidItem: Item = { sku: "abc" as any, name: "dummy", price: 10 };
    expect(() => checkout.scan(invalidItem)).toThrow("Cannot scan item: dummy");
  });
});
