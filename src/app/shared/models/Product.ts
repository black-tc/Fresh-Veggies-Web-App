export class Product {
    title:string;
    price:number;
    imageUrl:string;
    category:string;
    desc: string;
    quantity: string;

    constructor(title, price, imageUrl, category, quantity, desc) {
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
        this.desc = desc;
        this.quantity = quantity;
    }


}
