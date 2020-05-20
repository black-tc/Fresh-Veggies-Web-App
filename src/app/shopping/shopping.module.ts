import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { CheckOutFormComponent } from './components/check-out-form/check-out-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from 'shared/shared.module';
import { CarouselComponent } from './carousel/carousel.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    CheckOutFormComponent,
    ShoppingCartSummaryComponent,
    OrderDetailsComponent,
    ProductFilterComponent,
    CarouselComponent
  ],
  imports: [
    SharedModule,
  ],
  exports:[
    ProductFilterComponent
  ]

})
export class ShoppingModule { }
