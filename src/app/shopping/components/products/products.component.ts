import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseData } from 'shared/models/FirebaseData';
import { Product } from 'shared/models/Product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/ShoppingCart';
import { FilterQueryService } from 'shared/services/filter-query.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: FirebaseData<Product>[] = [];
  filteredProducts: FirebaseData<Product>[];
  category: string;
  query$: Observable<string>;
  query: string;
  cart$: Observable<ShoppingCart>;
  querySubscription: Subscription


  constructor(private productService: ProductService, private route: ActivatedRoute, private shoppingCartService: ShoppingCartService, private filterQueryService: FilterQueryService) { }

  async ngOnInit() {
    this.populateProducts()
    this.cart$ = await this.shoppingCartService.getCart();
    this.query$ = this.filterQueryService.getQuery();
    this.querySubscription = this.query$.subscribe(res => {
      this.query = res;
      this.queryFilter();
    })
  }

  ngOnDestroy(){
    this.querySubscription.unsubscribe();
  }

  queryFilter() {
    if (this.query) {
      this.applyFilter();
      this.filteredProducts = (this.query) ?
        this.filteredProducts.filter(p => p.data.title.toLowerCase().includes(this.query.toLowerCase())) :
        this.filteredProducts;
    }
  }

  private populateProducts() {
    this.productService.getAll()
      .pipe(
        switchMap(products => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      })
  }

  private applyFilter() {
    this.filteredProducts = this.category ?
      this.products.filter(p => p.data.category === this.category) :
      this.products;
  }
}
