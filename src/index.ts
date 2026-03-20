interface Item {
  sku: string;
  name: string;
  price: number;
}

class Checkout {
  private items: Item[] = [];

  scan(item: Item): void {
    this.items.push(item);
  }

  total(): void {
    console.log(
      parseFloat(
        this.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)
      )
    );
  }
}

const item1: Item = { sku: "ipd", name: "Super iPad", price: 549.99 };
const item2: Item = { sku: "mbp", name: "MacBook Pro", price: 1399.99 };
const item3: Item = { sku: "atv", name: "Apple TV", price: 109.5 };
const item4: Item = { sku: "vga", name: "VGA adapter", price: 30.0 };

const co = new Checkout();
co.scan(item1);
co.scan(item2);
co.scan(item3);
co.scan(item4);
co.total();
