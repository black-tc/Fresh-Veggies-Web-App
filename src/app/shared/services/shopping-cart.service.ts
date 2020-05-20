import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from 'shared/models/Product';
import { FirebaseData } from 'shared/models/FirebaseData';
import { take, map } from 'rxjs/operators'
import { Item } from 'shared/models/Item';
import { ShoppingCart } from 'shared/models/ShoppingCart';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cart$

  constructor(private db: AngularFireDatabase) { }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId()
    this.cart$ = this.db.object<any>('/shopping-carts/' + cartId).snapshotChanges()
      .pipe(
        map(x => new ShoppingCart(x.payload.val().items))
      );
    return this.cart$;
  }

  async addToCart(product: FirebaseData<Product>) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(
      take(1)
    ).subscribe(item => {
      if (item.payload.val()) {
        item$.update({ quantity: item.payload.val().quantity + 1 })
      } else {
        item$.set({
          title: product.data.title,
          price: product.data.price,
          imageUrl: product.data.imageUrl,
          quantity: 1,
        } as Item)
      }
    })
  }

  async removeFromCart(product: FirebaseData<Product>) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(
      take(1)
    ).subscribe(item => {
      if (item.payload.val().quantity > 0) {
        let newQuantity = item.payload.val().quantity - 1;
        console.log(newQuantity)
        item$.update({ quantity: newQuantity })
        if (newQuantity === 0) {
          item$.remove();
        }
      }
    })
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }


  private async getOrCreateCartId(): Promise<string> {
    // let cartId = this.localShoppingCartService.getLocalShoppingCartId()

    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let result = await this.create();
      cartId = localStorage.getItem('cartId')
      if (cartId) {
        this.db.object('/shopping-carts/'+result.key).remove()
        return cartId;
      } else {
        localStorage.setItem('cartId', result.key)
        return result.key;
      }
      // this.create().then(
      //   result => {
      // localStorage.setItem('cartId', result.key)
      // return this.getCart(result.key);
      //   });
    }
    return cartId;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object<Item>('shopping-carts/' + cartId + '/items/' + productId);
  }


}
