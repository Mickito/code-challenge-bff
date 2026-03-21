import { Checkout } from "./checkout/checkout";
import { catalog } from "./catalog/catalog";
import { BundleDiscount, BulkDiscount } from "./rules";

const atvBundleDiscount = new BundleDiscount("atv", 3, 2);
const ipdBulkDiscount = new BulkDiscount("ipd", 4, 499.99);
const pricingRules = [atvBundleDiscount, ipdBulkDiscount];

const co = new Checkout(pricingRules);
co.scan(catalog.ipd);
co.scan(catalog.mbp);

console.log("Total expected: $" + co.total());
