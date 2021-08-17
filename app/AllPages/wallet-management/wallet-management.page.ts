import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/config/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';


@Component({
  selector: 'app-wallet-management',
  templateUrl: './wallet-management.page.html',
  styleUrls: ['./wallet-management.page.scss'],
})
export class WalletManagementPage implements OnInit {

  gotScreenTitle: any;
  screenDataArray: any = [];
  gotScreenName: any;
  gotScreenId: any;
  imageBaseUrl: any = 'http://digisevakendra.com/admin/images/';

  loadfirstItem: number = 10;

  constructor(
    private router: Router,
    public platform: Platform,
    private loadingService: LoadingService,
    private shareData: ShareDataService,
    private apiService: ApiService,
    private eventService: EventService,
    public alertController: AlertController,
    private activatedroute: ActivatedRoute,


  ) {


  }

  ionViewDidEnter() {
    this.activatedroute.params.subscribe((data: any) => {
      this.gotScreenId = data.screenId
      this.gotScreenTitle = data.screenName
      console.log("got screen id =", this.gotScreenId)
      console.log("got screen Name =", this.gotScreenTitle)
      if (this.gotScreenId == "37") {
        this.gotScreenName = 'wallet-balance';
      } else if (this.gotScreenId == "39") {
        this.gotScreenName = 'wallet-request';
      } else if (this.gotScreenId == "40") {
        this.gotScreenName = 'bank-details';
      }
      this.callApiByScreen_Name(this.gotScreenName)
    })
  }

  ngOnInit() {
  }

  callApiByScreen_Name(gotScreenName: any) {
    this.screenDataArray = [];
    this.loadingService.show("Loading...");
    this.apiService.callApiByScreenName(gotScreenName, this.shareData.memberDetails.UserRoleUId,
      this.shareData.memberDetails.UniqueId)
      .subscribe((data: any) => {
        if (data !== null) {
          // console.log("data= ", data);
          if (data.action == "yes") {
            this.loadingService.hide();
            if (gotScreenName == 'wallet-balance') {
              this.screenDataArray = data['wallet-balance'];
            } else if (gotScreenName == 'wallet-request') {
              this.screenDataArray = data['wallet-request'];
            } else if (gotScreenName == 'bank-details') {
              this.screenDataArray = data['bank-details'];
            }
            //console.log("screen " + gotScreenName + " Array =", this.screenDataArray)
          }
        } else if (data == null) {
          this.loadingService.hide();
          this.screenDataArray = null;
        }

      })
  }

  walletRequest() {
    if (this.shareData.isLogin == true) {
      this.router.navigate(['/add-wallet-request'])
    } else {

    }
  }

  walletmanage(user: any) {
    // console.log('selected user', user)
    if (this.shareData.isLogin == true) {
      this.router.navigate(['/wallet-balance-manage', { userInfo: JSON.stringify(user) }])
    } else {

    }
  }


  loadMoreData(event) {
    setTimeout(() => {
      this.loadfirstItem += 10;
      event.target.complete();
    }, 300);

  }







}
