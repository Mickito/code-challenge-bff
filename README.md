Checkout System
-----------------

This is a checkout system for a computer store written in TypeScript.  
It supports scanning items in any order, calculating totals and applying flexible pricing rules such as:

- Bulk Discount: When you buy multiple units of the same item the system can lower the price per item.
- Bundle Discount: When you buy multiple units of the same item the system can give free items.

The current catalog can be extended and currently includes:

| SKU     | Name        | Price    |
| --------|:-----------:| --------:|
| ipd     | Super iPad  | $549.99  |
| mbp     | MacBook Pro | $1399.99 |
| atv     | Apple TV    | $109.50  |
| vga     | VGA adapter | $30.00   |

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
