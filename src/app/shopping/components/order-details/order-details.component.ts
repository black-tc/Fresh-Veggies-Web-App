import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { FirebaseData } from 'shared/models/FirebaseData';
import { Order } from 'shared/models/Order';
import { OrderService } from 'shared/services/order.service';
import { Item } from 'shared/models/Item';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: FirebaseData<Order>;
  orderItems: Item[];
  subscription: Subscription;
  total=0;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {

  }

  ngOnInit() {
    let order$ = this.orderService.getOrderById(this.route.snapshot.paramMap.get('id'))
    order$.pipe(
      take(1)
    ).subscribe(order => {
      this.order = order;
      this.orderItems = order.data.items.map(i => {
        return new Item(i);
      })
      this.orderItems.forEach(i => {
        this.total += i.totalPrice;
      })
    })
  }

}
