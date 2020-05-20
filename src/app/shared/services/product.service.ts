import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FirebaseData } from 'shared/models/FirebaseData';
import { Product } from 'shared/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<FirebaseData<Product>[]> {
    return this.db.list('/products').snapshotChanges()
      .pipe(
        map(products => {
          return products.map(p => {
            const key = p.payload.key;
            const data = p.payload.val();
            return new FirebaseData(key, data)
          })
        })
      );
  }

  get(productId): Observable<FirebaseData<Product>> {
    return this.db.object('/products/' + productId).snapshotChanges()
      .pipe(
        map(product => {
          const key = product.payload.key;
          const data = product.payload.val();

          return new FirebaseData(key, data)

          // return { key, data }
        })
      );
  }


  create(product) {
    return this.db.list('/products').push(product);
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
