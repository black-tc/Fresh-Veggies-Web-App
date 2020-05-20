import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Order } from 'shared/models/Order';
import { ShoppingCartService } from './shopping-cart.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { FirebaseData } from 'shared/models/FirebaseData';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order: Order) {
    let result = await this.storeOrder(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders(): Observable<FirebaseData<Order>[]> {
    return this.db.list<Order>('/orders').snapshotChanges().pipe(
      map(orders => {
        return orders.map(o => {
          const key = o.key;
          const data = o.payload.val();
          return new FirebaseData(key, data);
        })
      })
    );
  }

  getOrdersByUser(userId: string): Observable<FirebaseData<Order>[]> {
    return this.db.list<Order>('/orders', ref => ref.orderByChild('/userId').equalTo(userId)).snapshotChanges().pipe(
      map(orders => {
        return orders.map(o => {
          const key = o.key;
          const data = o.payload.val();
          return new FirebaseData(key, data);
        })
      })
    );
  }

  getOrderById(orderId: string): Observable<FirebaseData<Order>> {
    console.log("order service")
    return this.db.object('/orders/' + orderId).snapshotChanges().pipe(
      map(o => {
        const key = o.key;
        const data = o.payload.val();
        return new FirebaseData(key, data);
      })
    )
  }

  private storeOrder(order: Order) {
    return this.db.list<Order>('/orders').push(order);
  }
}
