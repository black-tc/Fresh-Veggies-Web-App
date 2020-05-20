import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from 'shared/models/Product';
import { FirebaseData } from 'shared/models/FirebaseData';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product: FirebaseData<Product> = {
    key: null,
    data: {
      title: null,
      price: null,
      imageUrl: null,
      category: null,
      desc: null,
      quantity: null,
    }
  };
  id;
  constructor(categoryService: CategoryService, private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    this.categories$ = categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      // this.productService.get(id)
      // .subscribe(p=> this.product = p);
      this.productService.get(this.id).pipe(take(1)).subscribe(res => {
        this.product = res;
      });
    }
  }

  ngOnInit() {
  }


  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products'])
  }

  delete() {
    if (confirm('are you sure you want to delete this product?')) {
      this.productService.delete(this.id)
      this.router.navigate(['/admin/products'])
    }
  }


}
