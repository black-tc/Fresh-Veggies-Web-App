import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/Product';
import { FirebaseData } from 'shared/models/FirebaseData';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/ShoppingCart';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: FirebaseData<Product>;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }


  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product)
  }


}
