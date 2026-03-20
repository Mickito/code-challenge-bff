import { Checkout } from "./checkout/checkout";
import { Item } from "./item";
import { BundlePricingRule } from "./rules/bundlePricingRule";
import { BulkDiscountRule } from "./rules/bulkDiscountRule";

const item1: Item = { sku: "ipd", name: "Super iPad", price: 549.99 };
const item2: Item = { sku: "mbp", name: "MacBook Pro", price: 1399.99 };
const item3: Item = { sku: "atv", name: "Apple TV", price: 109.5 };
const item4: Item = { sku: "vga", name: "VGA adapter", price: 30.0 };

const atvBundlePricingRule = new BundlePricingRule(item3.sku, 3, 2);
const ipdBulkDiscountRule = new BulkDiscountRule(item1.sku, 4, 499.99);
const pricingRules = [atvBundlePricingRule, ipdBulkDiscountRule];

const co = new Checkout(pricingRules);
co.scan(item1);
co.scan(item2);
co.scan(item3);
co.scan(item4);
console.log("Total expected: $" + co.total());
