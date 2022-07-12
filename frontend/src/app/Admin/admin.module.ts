import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxEchartsModule } from 'ngx-echarts';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { AngularMaterialModule } from '../modules/angular-material.module';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminBannerComponent } from './admin-banner/admin-banner.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AdminContactComponent } from './admin-contact/admin-contact.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminProductsComponent,
    AdminUsersComponent,
    AdminBannerComponent,
    AdminContactComponent,
  ],
  imports: [
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    RouterModule,
    AdminRoutingModule,
    AngularMaterialModule,
    FormsModule,
    MatSortModule,
    MatTableExporterModule
  ],
})
export class AdminModule {}
