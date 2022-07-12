import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ProductService } from '../../Services/product.service';
import { ProductCategories } from 'src/app/Models/product-categories';
import { EChartsOption } from 'echarts';
import { AdminService } from 'src/app/Services/admin.service';
import { ContactService } from 'src/app/Services/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  opened: boolean = false;
  _TOTAL_AMOUNT: any;
  _TOTAL_USERS: any;
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 },
      ];
    })
  );
  messages: any = []
  constructor(private contact: ContactService,
    private breakpointObserver: BreakpointObserver,
    private service: ProductService,
    private adminService: AdminService,
    private toastr: ToastrService
  ) { }
  category: ProductCategories[] = [];
  ngOnInit() {
    this.service.getAllCategory().subscribe((data) => {
      this.category = data;
    });
    this.contact.getMessageFromUsers().subscribe(data => {
      this.messages = data.message
    }, () => {
      this.toastr.error('Fetching message error', 'Message', {
        closeButton: false,
        progressAnimation: 'increasing',
        progressBar: true,
        easing: 'linear',
        positionClass: 'toast-top-left'
      });
    })

    this.adminService.getFoodAmount().subscribe((data) => {
      this._TOTAL_AMOUNT = data[0].TotalAmount;
    });
    this.adminService.getAllUsers().subscribe((data) => {
      this._TOTAL_USERS = data.length;
    });
  }

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [0, 56, 102, 305, 454, 505, 930],
        type: 'line',
      },
    ],
  };
}
