import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterQueryService {
  query$: Observable<string>;
  private querySubject = new Subject<string>()

  constructor() {
    this.query$ = this.querySubject.asObservable();
  }

  getQuery(){
    return this.query$
  }

  setQuery(query: string) {
    this.querySubject.next(query);
  }
}
