Checkout System
-----------------

This is a checkout system for a computer store written in TypeScript.  
It supports scanning items in any order, calculating totals and applying flexible pricing rules such as:

- Bulk Discount: When you buy multiple units of the same item the system can lower the price per item.
- Bundle Discount: When you buy multiple units of the same item the system can give free items.

Future extensions could allow sequential stacking of discounts for the same SKU. Currently, only the highest discount is applied per SKU.

The current catalog can be extended and currently includes:

| SKU     | Name        | Price    |
| --------|:-----------:| --------:|
| ipd     | Super iPad  | $549.99  |
| mbp     | MacBook Pro | $1399.99 |
| atv     | Apple TV    | $109.50  |
| vga     | VGA adapter | $30.00   |

Assumptions
-----------------
- Applies only the largest discount per SKU when multiple rules exist for that SKU instead of stacking
- Cart items must exist in the catalog and scanning unknown items throws an error
- Using Jest for testing

Installation
-----------------
Clone the repository and install dependencies:

- git clone https://github.com/Mickito/code-challenge-bff.git
- cd code-challenge-bff
- npm install
- npm run build
- To run example: npm start
- To run tests: npm test

Tech Stack
-----------------
- Language: TypeScript
- Testing: Jest