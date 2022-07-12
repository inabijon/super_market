import { Component, OnInit } from '@angular/core';
import { AddToCardService } from '../../Services/add-to-card.service';
import { Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { FoodProduct } from 'src/app/Models/food-product';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  public checkOutProducts: any;
  constructor(
    private AddToCardService: AddToCardService,
    private router: Router,
    private ProductService: ProductService
  ) { }

  total: any = []

  ngOnInit() {

    this.total = this.AddToCardService.getItems()

  }

  get totalPrice() {
    return this.total.reduce(
      (sum: any, x: FoodProduct) => ({
        qtyTotal: 1,
        price: sum.price + x.qtyTotal * x.price,
      }),
      { qtyTotal: 1, price: 0 }
    ).price;
  }

  goShopping() {
    this.router.navigate(['/']);
  }
}
