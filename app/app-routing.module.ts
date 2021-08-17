import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'intro',
  //   pathMatch: 'full'
  // },
  {
    path: 'menu',
    loadChildren: () => import('./AllPages/menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./AllPages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./AllPages/userManagement/edit-user/edit-user.module').then(m => m.EditUserPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./AllPages/userManagement/change-password/change-password.module').then(m => m.ChangePasswordPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./AllPages/intro/intro.module').then(m => m.IntroPageModule)
  },
  {
    path: 'add-user',
    loadChildren: () => import('./Allpages/usermanagement/add-user/add-user.module').then(m => m.AddUserPageModule)
  },
  {
    path: 'ration-card-form',
    loadChildren: () => import('./AllPages/onlineForms/ration-card-form/ration-card-form.module').then(m => m.RationCardFormPageModule)
  },
  {
    path: 'death-certificate',
    loadChildren: () => import('./AllPages/onlineForms/death-certificate/death-certificate.module').then(m => m.DeathCertificatePageModule)
  },
  {
    path: 'birth-certificate',
    loadChildren: () => import('./AllPages/onlineForms/birth-certificate/birth-certificate.module').then(m => m.BirthCertificatePageModule)
  },
  {
    path: 'domicile-certificate',
    loadChildren: () => import('./AllPages/onlineForms/domicile-certificate/domicile-certificate.module').then(m => m.DomicileCertificatePageModule)
  },
  {
    path: 'caste-certificate',
    loadChildren: () => import('./AllPages/onlineForms/caste-certificate/caste-certificate.module').then(m => m.CasteCertificatePageModule)
  },
  {
    path: 'income-certificate',
    loadChildren: () => import('./AllPages/onlineForms/income-certificate/income-certificate.module').then(m => m.IncomeCertificatePageModule)
  },
  {
    path: 'pan-card-form',
    loadChildren: () => import('./AllPages/onlineForms/pan-card-form/pan-card-form.module').then(m => m.PanCardFormPageModule)
  },
  {
    path: 'driving-licence-form',
    loadChildren: () => import('./AllPages/onlineForms/driving-licence-form/driving-licence-form.module').then(m => m.DrivingLicenceFormPageModule)
  },
  {
    path: 'pasport-form',
    loadChildren: () => import('./AllPages/onlineForms/pasport-form/pasport-form.module').then(m => m.PasportFormPageModule)
  },
  {
    path: 'old-pention-form',
    loadChildren: () => import('./AllPages/onlineForms/old-pention-form/old-pention-form.module').then(m => m.OldPentionFormPageModule)
  },
  {
    path: 'widow-pention-form',
    loadChildren: () => import('./AllPages/onlineForms/widow-pention-form/widow-pention-form.module').then(m => m.WidowPentionFormPageModule)
  },
  {
    path: 'handicap-pention-form',
    loadChildren: () => import('./AllPages/onlineForms/handicap-pention-form/handicap-pention-form.module').then(m => m.HandicapPentionFormPageModule)
  },
  {
    path: 'shadi-anudan-form',
    loadChildren: () => import('./AllPages/onlineForms/shadi-anudan-form/shadi-anudan-form.module').then(m => m.ShadiAnudanFormPageModule)
  },
  {
    path: 'family-labh-form',
    loadChildren: () => import('./AllPages/onlineForms/family-labh-form/family-labh-form.module').then(m => m.FamilyLabhFormPageModule)
  },
  {
    path: 'up-shramik-card',
    loadChildren: () => import('./AllPages/onlineForms/up-shramik-card/up-shramik-card.module').then(m => m.UpShramikCardPageModule)
  },
  {
    path: 'voter-id-form',
    loadChildren: () => import('./AllPages/onlineforms/voter-id-form/voter-id-form.module').then(m => m.VoterIdFormPageModule)
  },
  {
    path: 'pm-kisan-samman-form',
    loadChildren: () => import('./AllPages/onlineforms/pm-kisan-samman-form/pm-kisan-samman-form.module').then(m => m.PmKisanSammanFormPageModule)
  },
  {
    path: 'new-gstregistration',
    loadChildren: () => import('./AllPages/onlineforms/new-gstregistration/new-gstregistration.module').then(m => m.NewGSTRegistrationPageModule)
  },
  {
    path: 'pvc-card-service',
    loadChildren: () => import('./AllPages/onlineforms/pvc-card-service/pvc-card-service.module').then(m => m.PvcCardServicePageModule)
  },
  {
    path: 'udhyog-adhar-certificate',
    loadChildren: () => import('./AllPages/onlineForms/udhyog-adhar-certificate/udhyog-adhar-certificate.module').then(m => m.UdhyogAdharCertificatePageModule)
  },
  {
    path: 'up-shop-licence-certificate',
    loadChildren: () => import('./AllPages/onlineForms/up-shop-licence-certificate/up-shop-licence-certificate.module').then(m => m.UpShopLicenceCertificatePageModule)
  },
  {
    path: 'pancard-details',
    loadChildren: () => import('./AllPages/orderDetails/pancard-details/pancard-details.module').then( m => m.PancardDetailsPageModule)
  },
  {
    path: 'income-details',
    loadChildren: () => import('./AllPages/orderDetails/income-details/income-details.module').then( m => m.IncomeDetailsPageModule)
  },
  {
    path: 'caste-details',
    loadChildren: () => import('./AllPages/orderDetails/caste-details/caste-details.module').then( m => m.CasteDetailsPageModule)
  },
  {
    path: 'domicile-details',
    loadChildren: () => import('./AllPages/orderDetails/domicile-details/domicile-details.module').then( m => m.DomicileDetailsPageModule)
  },
  {
    path: 'voterid-details',
    loadChildren: () => import('./AllPages/orderDetails/voterid-details/voterid-details.module').then( m => m.VoteridDetailsPageModule)
  },
  {
    path: 'rationcard-details',
    loadChildren: () => import('./AllPages/orderDetails/rationcard-details/rationcard-details.module').then( m => m.RationcardDetailsPageModule)
  },
  {
    path: 'birth-details',
    loadChildren: () => import('./AllPages/orderDetails/birth-details/birth-details.module').then( m => m.BirthDetailsPageModule)
  },
  {
    path: 'death-details',
    loadChildren: () => import('./AllPages/orderDetails/death-details/death-details.module').then( m => m.DeathDetailsPageModule)
  },
  {
    path: 'add-wallet-request',
    loadChildren: () => import('./AllPages/add-wallet-request/add-wallet-request.module').then( m => m.AddWalletRequestPageModule)
  },
  {
    path: 'oldagepention-details',
    loadChildren: () => import('./AllPages/orderDetails/oldagepention-details/oldagepention-details.module').then( m => m.OldagepentionDetailsPageModule)
  },
  {
    path: 'widowpention-details',
    loadChildren: () => import('./AllPages/orderDetails/widowpention-details/widowpention-details.module').then( m => m.WidowpentionDetailsPageModule)
  },
  {
    path: 'newgst-details',
    loadChildren: () => import('./AllPages/orderDetails/newgst-details/newgst-details.module').then( m => m.NewgstDetailsPageModule)
  },
  {
    path: 'shadianudan-details',
    loadChildren: () => import('./AllPages/orderDetails/shadianudan-details/shadianudan-details.module').then( m => m.ShadianudanDetailsPageModule)
  },
  {
    path: 'handicap-details',
    loadChildren: () => import('./Allpages/orderDetails/handicap-details/handicap-details.module').then( m => m.HandicapDetailsPageModule)
  },
  {
    path: 'parivarik-details',
    loadChildren: () => import('./Allpages/orderDetails/parivarik-details/parivarik-details.module').then( m => m.ParivarikDetailsPageModule)
  },
  {
    path: 'pmkishan-details',
    loadChildren: () => import('./AllPages/orderDetails/pmkishan-details/pmkishan-details.module').then( m => m.PmkishanDetailsPageModule)
  },
  {
    path: 'upshramik-details',
    loadChildren: () => import('./AllPages/orderDetails/upshramik-details/upshramik-details.module').then( m => m.UpshramikDetailsPageModule)
  },
  {
    path: 'upshoplicence-details',
    loadChildren: () => import('./AllPages/orderDetails/upshoplicence-details/upshoplicence-details.module').then( m => m.UpshoplicenceDetailsPageModule)
  },
  {
    path: 'udhyogadhar-details',
    loadChildren: () => import('./AllPages/orderDetails/udhyogadhar-details/udhyogadhar-details.module').then( m => m.UdhyogadharDetailsPageModule)
  },
  {
    path: 'passport-details',
    loadChildren: () => import('./AllPages/orderDetails/passport-details/passport-details.module').then( m => m.PassportDetailsPageModule)
  },
  {
    path: 'pvccard-details',
    loadChildren: () => import('./AllPages/orderDetails/pvccard-details/pvccard-details.module').then( m => m.PvccardDetailsPageModule)
  },
  {
    path: 'wallet-balance-manage',
    loadChildren: () => import('./AllPages/wallet-balance-manage/wallet-balance-manage.module').then( m => m.WalletBalanceManagePageModule)
  },





  // {
  //   path: 'global-online-form',
  //   loadChildren: () => import('./AllPages/onlineForms/global-online-form/global-online-form.module').then( m => m.GlobalOnlineFormPageModule)
  // },

  // {
  //   path: 'order-management',
  //   loadChildren: () => import('./AllPages/order-management/order-management.module').then( m => m.OrderManagementPageModule)
  // },
  // {
  //   path: 'download-management',
  //   loadChildren: () => import('./AllPages/download-management/download-management.module').then( m => m.DownloadManagementPageModule)
  // },
  // {
  //   path: 'wallet-management',
  //   loadChildren: () => import('./AllPages/wallet-management/wallet-management.module').then( m => m.WalletManagementPageModule)
  // },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./AllPages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  // },
  // {
  //   path: 'e-district-service',
  //   loadChildren: () => import('./AllPages/onlineForms/e-district-service/e-district-service.module').then( m => m.EDistrictServicePageModule)
  // },
  // {
  //   path: 'online-card-service',
  //   loadChildren: () => import('./AllPages/onlineForms/online-card-service/online-card-service.module').then( m => m.OnlineCardServicePageModule)
  // },
  // {
  //   path: 'arto-sercice',
  //   loadChildren: () => import('./AllPages/onlineForms/arto-sercice/arto-sercice.module').then( m => m.ArtoSercicePageModule)
  // },
  // {
  //   path: 'pasport-seva',
  //   loadChildren: () => import('./AllPages/onlineForms/pasport-seva/pasport-seva.module').then( m => m.PasportSevaPageModule)
  // },
  // {
  //   path: 'user-managemnet',
  //   loadChildren: () => import('./AllPages/user-managemnet/user-managemnet.module').then( m => m.UserManagemnetPageModule)
  // },
  // {
  //   path: 'masterdata',
  //   loadChildren: () => import('./AllPages/masterdata/masterdata.module').then( m => m.MasterdataPageModule)
  // },
  // {
  //   path: 'digi-mart',
  //   loadChildren: () => import('./AllPages/digi-mart/digi-mart.module').then( m => m.DigiMartPageModule)
  // },
  // {
  //   path: 'digimart-orders',
  //   loadChildren: () => import('./AllPages/digimart-orders/digimart-orders.module').then( m => m.DigimartOrdersPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
