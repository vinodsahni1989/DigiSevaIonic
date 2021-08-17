import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/config/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-global-online-form',
  templateUrl: './global-online-form.page.html',
  styleUrls: ['./global-online-form.page.scss'],
})
export class GlobalOnlineFormPage implements OnInit {


  gotScreenId: any;
  gotScreenName: any;
  screenDataArray: any = '';


  constructor(
    private router: Router,
    public platform: Platform,
    private storage: Storage,
    private loadingService: LoadingService,
    private shareData: ShareDataService,
    private apiService: ApiService,
    private eventService: EventService,
    public alertController: AlertController,
    private activatedroute: ActivatedRoute,

  ) {
    this.gotScreenId = Number(this.activatedroute.snapshot.paramMap.get('screenId'))
    // console.log("got screen id =", this.gotScreenId)
    this.gotScreenName = this.activatedroute.snapshot.paramMap.get('screenName')
    // console.log("got screen name =", this.gotScreenName)
    this.callScreenApi(this.gotScreenId)
  }


  async ngOnInit() {
    await this.storage.create();
    this.callStorage();
  }


  callStorage() {
    this.storage.get('memberDetails').then((data: any) => {
      if (data !== null) {
        this.shareData.memberDetails = data;
        // console.log("member data storage =", this.shareData.memberDetails)
      } else if (data == null) {
        //console.log("member data storage =", null)

      }

    })

  }


  callScreenApi(screenId: any) {
    this.screenDataArray = '';
    this.loadingService.show("Loading...");
    this.apiService.callScreeApi(screenId, this.shareData.memberDetails.UserRoleUId,
      this.shareData.memberDetails.UniqueId)
      .subscribe((data: any) => {
        if (data !== null) {
          if (data.action == "yes") {
            this.loadingService.hide();
            this.screenDataArray = data.screen;
            //console.log("Online Form All screen =", this.screenDataArray)
          }
          else if (data == "") {
            this.loadingService.hide();
            this.loadingService.showToast("Server Error !!", 2000, 'danger');
          }
        } else if (data == null) {
          this.loadingService.hide();
          this.screenDataArray = null;
        } else if (data == "") {
          this.loadingService.hide();
          this.loadingService.showToast("Server Error !!", 2000, 'danger');
        }

      })
  }

  applyNow(item: any) {
    this.loadingService.autoHide(2000, "Loading...")
    // console.log("==>>", item)
    this.shareData.callStateGlobalApi();
    this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
    setTimeout(() => {
      if (item.form_id == "19") {
        if (this.shareData.walletBalance >= item.form_price) {

          this.router.navigate(['/ration-card-form', { formType: JSON.stringify(item) }])
        } else if (this.shareData.walletBalance < item.form_price) {
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      } else if (item.form_id == "18") {
        if (this.shareData.walletBalance >= item.form_price) {
          this.router.navigate(['/death-certificate', { formType: JSON.stringify(item) }]);
        } else if (this.shareData.walletBalance < item.form_price) {
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      } else if (item.form_id == "2") {
        if (this.shareData.walletBalance >= item.form_price) {
          this.router.navigate(['/caste-certificate', { formType: JSON.stringify(item) }])
        } else if (this.shareData.walletBalance < item.form_price) {
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      } else if (item.form_id == "1") {
        if (this.shareData.walletBalance >= item.form_price) {
          this.router.navigate(['/income-certificate', { formType: JSON.stringify(item) }]);
        } else if (this.shareData.walletBalance < item.form_price) {
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      } else if (item.form_id == "3") {
        if (this.shareData.walletBalance >= item.form_price) {
          this.router.navigate(['/domicile-certificate', { formType: JSON.stringify(item) }])
        } else if (this.shareData.walletBalance < item.form_price) {
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      } else if (item.form_id == "17") {
        if (this.shareData.walletBalance >= item.form_price) {
          this.router.navigate(['/birth-certificate', { formType: JSON.stringify(item) }])
        } else if (this.shareData.walletBalance < item.form_price) {
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      } else if (item.form_id == "5") {
        if (this.shareData.walletBalance >= item.form_price) {
          this.router.navigate(['/pan-card-form', { formType: JSON.stringify(item) }]);
        } else if (this.shareData.walletBalance < item.form_price) {
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      } else if (item.form_id == "6" || item.form_id == "7") {
        if (this.shareData.walletBalance >= item.form_price) {
          this.router.navigate(['/driving-licence-form', { formType: JSON.stringify(item) }]);
        } else if (this.shareData.walletBalance < item.form_price) {
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      } else if (item.form_id == "8" || item.form_id == "9" || item.form_id == "28") {
        if (this.shareData.walletBalance >= item.form_price) {
          this.router.navigate(['/pasport-form', { formType: JSON.stringify(item) }]);
        } else if (this.shareData.walletBalance < item.form_price) {
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      } else if (item.form_id == "10") {
        if (this.shareData.walletBalance >= item.form_price) {
          this.router.navigate(['/old-pention-form', { formType: JSON.stringify(item) }]);
        } else if (this.shareData.walletBalance < item.form_price) {
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      } else if (item.form_id == "11") {
        if (this.shareData.walletBalance >= item.form_price) {
          this.router.navigate(['/widow-pention-form', { formType: JSON.stringify(item) }]);
        } else if (this.shareData.walletBalance < item.form_price) {
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      } else if (item.form_id == "12") {
        if (this.shareData.walletBalance >= item.form_price) {
          this.router.navigate(['/handicap-pention-form', { formType: JSON.stringify(item) }]);
        } else if (this.shareData.walletBalance < item.form_price) {
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      } else if (item.form_id == "13") {
        if (this.shareData.walletBalance >= item.form_price) {
          this.router.navigate(['/shadi-anudan-form', { formType: JSON.stringify(item) }]);
        } else if (this.shareData.walletBalance < item.form_price) {
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      } else if (item.form_id == "14") {
        if (this.shareData.walletBalance >= item.form_price) {
          this.router.navigate(['/family-labh-form', { formType: JSON.stringify(item) }]);
        } else if (this.shareData.walletBalance < item.form_price) {
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      } else if (item.form_id == "16") {
        if (this.shareData.walletBalance >= item.form_price) {
          this.router.navigate(['/up-shramik-card', { formType: JSON.stringify(item) }]);
        } else if (this.shareData.walletBalance < item.form_price) {
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      } else if (item.form_id == "30") {
        if (this.shareData.walletBalance >= item.form_price) {
          this.router.navigate(['/pm-kisan-samman-form', { formType: JSON.stringify(item) }]);
        } else if (this.shareData.walletBalance < item.form_price) {
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      } else if (item.form_id == "36") {
        if (this.shareData.walletBalance >= item.form_price) {
          this.router.navigate(['/voter-id-form', { formType: JSON.stringify(item) }]);
        } else if (this.shareData.walletBalance < item.form_price) {
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      } else if (item.form_id == "22") {
        if (this.shareData.walletBalance >= item.form_price) {
          this.router.navigate(['/new-gstregistration', { formType: JSON.stringify(item) }]);
        } else if (this.shareData.walletBalance < item.form_price) {
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      } else if (item.form_id == "21") {
        if (this.shareData.walletBalance >= item.form_price) {
          this.router.navigate(['/pvc-card-service', { formType: JSON.stringify(item) }]);
        } else if (this.shareData.walletBalance < item.form_price) {
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      } else if (item.form_id == "27") {
        if (this.shareData.walletBalance >= item.form_price) {
          this.router.navigate(['/udhyog-adhar-certificate', { formType: JSON.stringify(item) }]);
        } else if (this.shareData.walletBalance < item.form_price) {
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      } else if (item.form_id == "26") {
        if (this.shareData.walletBalance >= item.form_price) {
          this.router.navigate(['/up-shop-licence-certificate', { formType: JSON.stringify(item) }]);
        } else if (this.shareData.walletBalance < item.form_price) {
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      }







    }, 2000)

  }




}
