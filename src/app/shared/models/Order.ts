import { Shipping } from './Shipping';
import { Item } from './Item';
import { ShoppingCart } from './ShoppingCart';

export class Order {
    datePlaced: any;
    items: Item[];

    constructor(public userId: string, public shipping: Shipping, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();
        this.items = shoppingCart.itemsArr.map(item=>{
            return item.data;
        })
    }
}