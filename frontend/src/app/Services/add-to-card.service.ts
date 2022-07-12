import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { FoodProduct } from '../Models/food-product';

@Injectable({
  providedIn: 'root',
})
export class AddToCardService {

  items: FoodProduct[] = [];
  savedProductListener = new BehaviorSubject<FoodProduct[]>(this.items);

  getSavedProductListener() {
    return this.savedProductListener.asObservable();
  }

  addToCart(addedItem: any) {
    this.items.push(addedItem);
    this.savedProductListener.next(addedItem);
    this.saveCart();
  }

  getItems() {
    return [...new Set(this.items)];
  }

  loadCart() {
    return (this.items = JSON.parse(localStorage.getItem('cart')!) ?? []);
  }

  saveCart() {
     localStorage.setItem('cart', JSON.stringify(this.items));
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem('cart');
  }

  removeItem(item: FoodProduct) {
    const index = this.items.findIndex((o) => o._id === item._id);
    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
      this.savedProductListener.next(this.items)
    }
  }

  itemInCart(item: FoodProduct): boolean {
    return this.items.findIndex((o) => o._id === item._id) > -1;
  }
}
