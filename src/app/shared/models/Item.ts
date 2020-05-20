import { Product } from './Product';

export class Item {

    title: string;
    imageUrl: string;
    price: number;
    quantity: number

    constructor(init?: Partial<Item>) {
        Object.assign(this, init)
    }

    get totalPrice() {
        return this.price * this.quantity;
    }

    set totalPrice(x){
        
    }
}