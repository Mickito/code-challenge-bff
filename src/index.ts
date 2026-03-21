import { Checkout } from "./checkout/checkout";
import { catalog } from "./item";
import { BundlePricingRule } from "./rules/bundlePricingRule";
import { BulkPricingRule } from "./rules/bulkPricingRule";

const atvBundlePricingRule = new BundlePricingRule("atv", 3, 2);
const ipdBulkPricingRule = new BulkPricingRule("ipd", 4, 499.99);
const pricingRules = [atvBundlePricingRule, ipdBulkPricingRule];

const co = new Checkout(pricingRules);
co.scan(catalog["ipd"]);
co.scan(catalog["mbp"]);
co.scan(catalog["atv"]);
co.scan(catalog["vga"]);
console.log("Total expected: $" + co.total());
