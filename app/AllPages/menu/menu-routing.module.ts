import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/menu/dashboard',
    pathMatch: 'full'
  },

  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../../AllPages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'masterdata',
        loadChildren: () => import('../../AllPages/masterdata/masterdata.module').then(m => m.MasterdataPageModule)
      },
      {
        path: 'download-management',
        loadChildren: () => import('../../AllPages/download-management/download-management.module').then(m => m.DownloadManagementPageModule)
      },
      {
        path: 'wallet-management',
        loadChildren: () => import('../../AllPages/wallet-management/wallet-management.module').then(m => m.WalletManagementPageModule)
      },
      {
        path: 'digi-mart',
        loadChildren: () => import('../../AllPages/digi-mart/digi-mart.module').then(m => m.DigiMartPageModule)
      },
      {
        path: 'digimart-orders',
        loadChildren: () => import('../../AllPages/digimart-orders/digimart-orders.module').then(m => m.DigimartOrdersPageModule)
      },
      {
        path: 'global-online-form',
        loadChildren: () => import('../../AllPages/onlineForms/global-online-form/global-online-form.module').then(m => m.GlobalOnlineFormPageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('../../AllPages/userManagement/users/users.module').then(m => m.UsersPageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('../../AllPages/notification/notification.module').then(m => m.NotificationPageModule)
      },

      {
        path: 'aprove-user',
        loadChildren: () => import('../../AllPages/userManagement/aprove-user/aprove-user.module').then(m => m.AproveUserPageModule)
      },
      {
        path: 'order-management',
        loadChildren: () => import('../../AllPages/order-management/order-management.module').then(m => m.OrderManagementPageModule)
      },




    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule { }
