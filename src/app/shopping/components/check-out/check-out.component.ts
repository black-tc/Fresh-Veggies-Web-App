import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from 'shared/models/ShoppingCart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AuthService } from 'shared/services/auth.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart$: Observable<ShoppingCart>;
  userSubscription: Subscription;
  userId: string;


  constructor(private shoppingCartService: ShoppingCartService, private authService: AuthService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
