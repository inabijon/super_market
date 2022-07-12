import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FoodProduct } from '../Models/food-product';
import { ProductCategories } from '../Models/product-categories';

const BACKEND_URL = 'https://supermarket7.herokuapp.com/api/';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) { }


  getAllCategory(): Observable<ProductCategories[]> {
    return this.http.get<ProductCategories[]>(
       BACKEND_URL +'categories'
    );
  }

  getAllFruitAndDrinkCategory(): Observable<ProductCategories[]> {

    return this.http.get<ProductCategories[]>(
     BACKEND_URL + 'all-categories'
    );
  }

  getFruitCategories(): Observable<ProductCategories[]> {
    return this.http.get<ProductCategories[]>(
      BACKEND_URL+'food-categories'
    );
  }
  getDrinkCategories(): Observable<ProductCategories[]> {
    return this.http.get<ProductCategories[]>(
      BACKEND_URL+'drink-categories'
    );
  }

  getFoodProducts(): Observable<FoodProduct[]> {
    return this.http.get<FoodProduct[]>(BACKEND_URL + 'foods');
  }

  newProduct(food: FoodProduct): Observable<any> {
    return this.http.post(BACKEND_URL + 'foods', food);
  }

  getOnlyFruits(): Observable<FoodProduct[]> {
    return this.http.get<FoodProduct[]>(
    BACKEND_URL + 'foods/fruits'
    );
  }
  getOnlyVegetables(): Observable<FoodProduct[]> {
    return this.http.get<FoodProduct[]>(
    BACKEND_URL + 'foods/vegetables'
    );
  }
  getOnlyMeat(): Observable<FoodProduct[]> {
    return this.http.get<FoodProduct[]>(
    BACKEND_URL + 'foods/meat-and-poultry'
    );
  }
  getOnlyGrains(): Observable<FoodProduct[]> {
    return this.http.get<FoodProduct[]>(
     BACKEND_URL + 'foods/grains'
    );
  }
  getOnlyFish(): Observable<FoodProduct[]> {
    return this.http.get<FoodProduct[]>(
      BACKEND_URL + 'foods/fish-and-seafood'
    );
  }
  getOnlyEggs(): Observable<FoodProduct[]> {
    return this.http.get<FoodProduct[]>(BACKEND_URL + 'foods/eggs');
  }
  getOnlyDairy(): Observable<FoodProduct[]> {
    return this.http.get<FoodProduct[]>(
     BACKEND_URL + 'foods/dairy-foods'
    );
  }
  getOnlyAlcoholic(): Observable<FoodProduct[]> {
    return this.http.get<FoodProduct[]>(
      BACKEND_URL + 'foods/alcoholic-drinks'
    );
  }
  getOnlyNonAlcoholic(): Observable<FoodProduct[]> {
    return this.http.get<FoodProduct[]>(
      BACKEND_URL + 'foods/non-alcoholic-drinks'
    );
  }
  getOnlyJuice(): Observable<FoodProduct[]> {
    return this.http.get<FoodProduct[]>(
     BACKEND_URL +  'foods/juice-and-plant-drinks'
    );
  }
  getOnlyHotDrinks(): Observable<FoodProduct[]> {
    return this.http.get<FoodProduct[]>(
      BACKEND_URL + 'foods/hot-drinks'
    );
  }
  getOnlyNewProducts(): Observable<FoodProduct[]> {
    return this.http.get<FoodProduct[]>(
      BACKEND_URL + 'foods/new-products'
    );
  }
  getOnlySaleProducts(): Observable<FoodProduct[]> {
    return this.http.get<FoodProduct[]>(
      BACKEND_URL + 'foods/sale-products'
    );
  }

  updateProduct(product: FoodProduct): Observable<FoodProduct> {
    return this.http.put<FoodProduct>(
     BACKEND_URL +  'foods/' + product._id,
      product
    );
  }

  // ! Search by key

  searchProduct(key: any) {
    return this.http.get(`${BACKEND_URL}foods/search/${key}`);
  }


  getProductById(product: any) {
    return this.http.get(`${BACKEND_URL}foods/${product}`)
  }




}
