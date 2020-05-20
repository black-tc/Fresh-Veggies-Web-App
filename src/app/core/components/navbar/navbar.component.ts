import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from 'shared/models/AppUser';
import { ShoppingCart } from 'shared/models/ShoppingCart';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser
  shoppingCart$: Observable<ShoppingCart>;
  public isMenuCollapsed = true;
  public isFilterMenuCollapsed = true;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.shoppingCart$ = await (await this.shoppingCartService.getCart());
  }

  logout() {
    this.isMenuCollapsed = true;
    this.auth.logout();
  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed; 
    this.isFilterMenuCollapsed = true
  }

  toggleFilterMenu() {
    this.isFilterMenuCollapsed = !this.isFilterMenuCollapsed;
    this.isMenuCollapsed = true
  }
}
