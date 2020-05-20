import { Item } from './Item';
import { Product } from './Product';
import { FirebaseData } from './FirebaseData';

export class ShoppingCart {

    itemsArr: FirebaseData<Item>[] = [];
    constructor(private items: { [key: string]: Item }) {
        this.items = items || {};
        for (let productId in items) {
            let item = items[productId];


            this.itemsArr.push(new FirebaseData(productId, new Item({ ...item })))

            // let mappedItem = new Item();
            // Object.assign(mappedItem, item);
            // this.itemsArr.push(new FirebaseData<Item>(productId, mappedItem));
        }
    }

    get totalPrice(): number {
        let sum = 0;
        this.itemsArr.forEach(item => {
            sum += item.data.totalPrice;
        })
        return sum;
    }

    get totalItemCount(): number {
        let count = 0;
        for (let productId in this.items) {
            count += this.items[productId].quantity;
        }
        return count;
    }

    getQuantity(product: FirebaseData<Product>) {
        let item = this.items[product.key];
        return item ? item.quantity : 0;
    }




}