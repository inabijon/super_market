import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../Admin/admin/admin.component';
import { AdminProductsComponent } from '../Admin/admin-products/admin-products.component';
import { AdminUsersComponent } from '../Admin/admin-users/admin-users.component';
import { AdminBannerComponent } from '../Admin/admin-banner/admin-banner.component';
import { AdminGuard } from './admin.guard';
import { AuthGuard } from '../auth/auth.guard';
import { AdminContactComponent } from './admin-contact/admin-contact.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard], title: 'Admin' },
  { path: 'admin-product', component: AdminProductsComponent, canActivate: [AuthGuard, AdminGuard], title: 'Admin Products' },
  { path: 'admin-user', component: AdminUsersComponent, canActivate: [AuthGuard, AdminGuard], title: 'Admin Users' },
  { path: 'admin-banner', component: AdminBannerComponent, canActivate: [AuthGuard, AdminGuard], title: 'Admin Banners' },
  { path: 'admin-contact', component: AdminContactComponent, canActivate: [AuthGuard, AdminGuard], title: 'Admin Messages' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AdminGuard]
})
export class AdminRoutingModule { }
