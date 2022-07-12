import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FoodProduct } from '../Models/food-product';
import { ProductCategories } from '../Models/product-categories';
import { ProductService } from '../Services/product.service';
import { AddToCardService } from '../Services/add-to-card.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

  fruitCategory: ProductCategories[] = [];
  drinkCategory: ProductCategories[] = [];
  foodProducts: FoodProduct[] = [];

  SearchProducts: any;
  isGetProducts = true;
  searchData: any = [];
  EMPTY_MESSAGE: string = '';
  IS_ACTIVE_MENU: boolean = false;
  _ADD_TO_CARD: boolean = false;
  isFirst = true;
  isLoading = true;

  items: FoodProduct[] = [];

  constructor(
    private product: ProductService,
    private AddToCardService: AddToCardService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router$: Router,
  ) { }

  // *----------------------------BANNER-----------------------------
  slidesStore = [
    {
      id: 1,
      src: '../../assets/banner/offer-1.png',
      alt: 'Hello',
      title: 'Hello Japan',
    },
    {
      id: 2,
      src: '../../assets/banner/offer-2.png',
      alt: 'Hello',
      title: 'Hello Japan',
    },
    {
      id: 3,
      src: '../../assets/banner/offer-3.png',
      alt: 'Hello',
      title: 'Hello Japan',
    },
    {
      id: 4,
      src: '../../assets/banner/offer-4.png',
      alt: 'Hello',
      title: 'Hello Japan',
    },
  ];

  // !---------------------------- Own carousel settings-------------------------
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fa-solid fa-chevron-left"></i>',
      '<i class="fa-solid fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 2,
      },
      940: {
        items: 3,
      },
    },
    nav: true,
  };

  ngOnInit() {

    this.isLoading = true;
    // *---------------getting Fruit Category from Product service-----------------------
    this.product.getFruitCategories().subscribe(
      (data) => {
        this.fruitCategory = data;
        this.isLoading = false;

      },
      (error) => {
        console.log(error, 'Something went wrong');
      }
    );

    // *---------------getting Drink Category from Product service-----------------------

    this.product.getDrinkCategories().subscribe(
      (data) => {
        this.drinkCategory = data;
        this.isLoading = false;
      },
      (error) => {
        console.log(error, 'Something went wrong');
      }
    );

    // *---------------getting All DATA  from Product service-----------------------
    this.product.getFoodProducts().subscribe(
      (data) => {
        this.foodProducts = data;
        this.isGetProducts = false;
        this.isLoading = false;
      },
      (error) => {
        console.log(error, 'Something went wrong');
      }
    );

    // * add to cart

    this.AddToCardService.loadCart();
    this.items = this.AddToCardService.getItems();



  }


  // *----------------------getting all products----------------------
  allProducts() {
    this.isLoading = true;
    this.product.getFoodProducts().subscribe(
      (data) => {
        this.foodProducts = data;
        this.isLoading = false;
      },
      (error) => {
        console.log(error, 'Something went wrong');
      }
    );
  }

  // *----------------------getting fruits products----------------------
  Fruits() {
    this.isLoading = true;
    this.product.getOnlyFruits().subscribe(
      (data) => {
        this.foodProducts = data;
        this.isLoading = false;
      },
      (error) => {
        console.log(error, 'Something went wrong');
      }
    );
  }

  // *----------------------getting vegetables products----------------------
  Vegetables() {
    this.isLoading = true;
    this.product.getOnlyVegetables().subscribe(
      (data) => {
        this.foodProducts = data;
        this.isLoading = false;
      },
      (error) => {
        console.log(error, 'Something went wrong');
      }
    );
  }

  // *----------------------getting meat and poultry  products----------------------
  MeatAndPoultry() {
    this.isLoading = true;
    this.product.getOnlyMeat().subscribe(
      (data) => {
        this.foodProducts = data;
        this.isLoading = false;
      },
      (error) => {
        console.log(error, 'Something went wrong');
      }
    );
  }

  // *----------------------getting fish products----------------------
  Fish() {
    this.isLoading = true;
    this.product.getOnlyFish().subscribe(
      (data) => {
        this.foodProducts = data;
        this.isLoading = false;

        if (data.length <= 0) {
          this.EMPTY_MESSAGE = 'Empty Products';
        }
      },
      (error) => {
        console.log(error, 'Something went wrong');
      }
    );
  }

  // *----------------------getting grains products----------------------
  Grains() {
    this.isLoading = true;
    this.product.getOnlyGrains().subscribe(
      (data) => {
        this.isLoading = false;
        this.foodProducts = data;
        this.isLoading = false;
      },
      (error) => {
        console.log(error, 'Something went wrong');
      }
    );
  }

  // *----------------------getting eggs products----------------------
  Eggs() {
    this.isLoading = true;
    this.product.getOnlyEggs().subscribe(
      (data) => {
        this.foodProducts = data;
        this.isLoading = false;
      },
      (error) => {
        console.log(error, 'Something went wrong');
      }
    );
  }

  // *----------------------getting dairy products----------------------
  DairyFoods() {
    this.isLoading = true;
    this.product.getOnlyDairy().subscribe(
      (data) => {
        this.foodProducts = data;
        this.isLoading = false;
      },
      (error) => {
        console.log(error, 'Something went wrong');
      }
    );
  }

  // *----------------------getting alcoholic drinks----------------------
  Alcoholic() {
    this.isLoading = true;
    this.product.getOnlyAlcoholic().subscribe(
      (res) => {
        this.foodProducts = res;
        this.isLoading = false;
      },
      (error) => {
        console.log(error, 'Something went wrong');
      }
    );
  }

  // *----------------------getting NonAlcoholics drinks----------------------
  NonAlcoholic() {
    this.isLoading = true;
    this.product.getOnlyNonAlcoholic().subscribe(
      (res) => {
        this.foodProducts = res;
        this.isLoading = false;
      },
      (error) => {
        console.log(error, 'Something went wrong');
      }
    );
  }

  // *----------------------getting Hot drinks----------------------
  HotDrinks() {
    this.isLoading = true;
    this.product.getOnlyHotDrinks().subscribe(
      (res) => {
        this.foodProducts = res;
        this.isLoading = false;
      },
      (error) => {
        console.log(error, 'Something went wrong');
      }
    );
  }

  // *----------------------getting Juice drinks----------------------
  JuiceAndPlantDrinks() {
    this.isLoading = true;
    this.product.getOnlyJuice().subscribe(
      (res) => {
        this.foodProducts = res;
        this.isLoading = false;
      },
      (error) => {
        console.log(error, 'Something went wrong');
      }
    );
  }

  // *----------------------getting Sort Sale Products----------------------
  sortOnlySaleProducts() {
    this.isLoading = true;
    this.product.getOnlySaleProducts().subscribe(
      (data) => {
        this.foodProducts = data;
        this.isLoading = false;
      },
      (error) => {
        console.log(error, 'Something went wrong');
      }
    );
  }
  // *----------------------getting Sort New Products----------------------
  sortOnlyNewProducts() {
    this.isLoading = true;
    this.product.getOnlyNewProducts().subscribe(
      (data) => {
        this.foodProducts = data;
        this.isLoading = false;
      },
      (error) => {
        console.log(error, 'Something went wrong');
      }
    );
  }

  // *----------------------Add to Cart ----------------------
  addToCart(item: FoodProduct) {
    if (!this.AddToCardService.itemInCart(item)) {
      item.qtyTotal = 1;
      this.AddToCardService.addToCart(item);
      this.items = [...this.AddToCardService.getItems()];
      this.toastr.success(`The ${item.name} has been added to the cart`, item.name, {
        closeButton: true,
        progressBar: true,
        easing: 'ease-in-out',
        positionClass: 'toast-top-left'
      });
    }
  }


  // *----------------------Search box----------------------
  _searchData: any = [];
  searchResultMessage = '';
  searchProduct(search: any) {
    this.isLoading = true
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.isLoading = false
    }, 1000);
    if (search.length > 0) {
      this.product.searchProduct(search).subscribe((data: any) => {
        this.SearchProducts = data;
        this.isLoading = false

        if (data.length > 0) {

          this.isLoading = false
        } else {

          this.isLoading = false

        }
        if (data.length <= 0) {
          this.isLoading = false

          this.searchResultMessage = 'Not Found';
        } else {
          this.searchResultMessage = '';
        }
      });
    } else return;
  }

  // *********************8Get by id product*************************88
  public getByIdProduct: any = []

  getById(food: any) {
    this.product.getProductById(food._id).subscribe(data => {
      this.getByIdProduct = data
    })
  }
}
