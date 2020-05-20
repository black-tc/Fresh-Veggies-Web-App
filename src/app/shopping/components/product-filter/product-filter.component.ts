import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { FilterQueryService } from 'shared/services/filter-query.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('category') category;
  query: string;

  constructor(private categoryService: CategoryService, private filterQuery: FilterQueryService) {
    this.categories$ = categoryService.getAll();
  }

  ngOnInit() {
  }

  queryFilter() {
    this.filterQuery.setQuery(this.query)
  }

}

// export interface queryEvent {
//   value: string
// }
