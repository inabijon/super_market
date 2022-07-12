import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { FoodProduct } from '../Models/food-product';
import { ProductCategories } from '../Models/product-categories';
import { AuthService } from '../Services/auth.service';
import { ProductService } from '../Services/product.service';
import { AddToCardService } from '../Services/add-to-card.service';
import { Router } from '@angular/router';
import { AdminService } from '../Services/admin.service';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(
    private AddToCardService: AddToCardService,
    private currencyPipe: CurrencyPipe,
    private Router: Router,
    public auth: AuthService,
    public admin: AdminService
  ) { }

  // !AUTH
  isUserAuthListener!: Subscription;

  // ! shopping cart
  public items: any = [];
  public grandTotal: number = 0;
  public totalItem: number = 0;
  public totalProductNumber!: FoodProduct[];
  i: any;

  private authListenerSubs!: Subscription;
  userIsAuthenticated = false;
  isAdmin = false;

  @ViewChildren('subTotalWrap') subTotalItems!: QueryList<ElementRef>;
  @ViewChildren('subTotalWrap_existing')
  subTotalItems_existing!: QueryList<ElementRef>;


  // ******************** ngOnInit *********************

  ngOnInit() {
    // !Authentication
    this.userIsAuthenticated = this.auth.getIsAuth();
    const token = localStorage.getItem('token')
    if (token) {
      this.userIsAuthenticated = true
      if (this.auth.getCurrentUser.isAdmin === true) {
        this.isAdmin = true
        this.userIsAuthenticated = true
      }
    }

    this.authListenerSubs = this.auth
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.auth
      .getIsAdminStatusListener()
      .subscribe((data) => (this.isAdmin = data));

    // !shopping cart
    this.AddToCardService.getSavedProductListener().subscribe((data) => {
      this.items.push(data);
    });
    this.AddToCardService.loadCart();
    this.items = this.AddToCardService.getItems();

  }

  // *********************** ngOnInit Closed****************** *****
  // !shopping cart
  //----- calculate total
  get total() {
    return this.items.reduce(
      (sum: any, x: FoodProduct) => ({
        qtyTotal: 1,
        price: sum.price + x.qtyTotal * x.price,
      }),
      { qtyTotal: 1, price: 0 }
    ).price;
  }

  changeSubtotal(item: FoodProduct, index: number) {
    const qty = item.qtyTotal;
    const amt = item.price;
    const subTotal = amt * qty;
    const subTotal_converted = this.currencyPipe.transform(subTotal, 'USD');

    this.subTotalItems.toArray()[index].nativeElement.innerHTML =
      subTotal_converted;
    this.AddToCardService.saveCart();
  }

  //----- clear cart item
  clearCart() {
    this.AddToCardService.clearCart();
    this.items = [...this.AddToCardService.getItems()];
  }
  //----- remove specific item
  removeFromCart(item: FoodProduct) {
    this.AddToCardService.removeItem(item);
    this.items = this.AddToCardService.getItems();
  }
  checkOut() {
    this.Router.navigate(['/check-out']);
  }
  // ! AUTH
  logout() {
    this.auth.logout();
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
