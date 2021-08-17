import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { IonRouterOutlet, MenuController, NavController, Platform } from '@ionic/angular';
import { ApiService } from './services/config/api.service';
import { LoadingService } from './services/loading/loading.service';
import { EventService } from './services/event/event.service';
import { Network } from '@ionic-native/network/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ShareDataService } from './services/shareData/share-data.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {



  pushes: any = [];

  constructor(
    private platform: Platform,
    public apiService: ApiService,
    private storage: Storage,
    private loadingService: LoadingService,
    private router: Router,
    private eventservice: EventService,
    private shareData: ShareDataService,
    private navCtrl: NavController,
    private network: Network,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menuCtrl: MenuController,

  ) {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#603d94');
      setTimeout(() => {
        this.splashScreen.hide();
      }, 4000);
    });
    this.initializeApp();
    let connectedToInternet = true;
    network.onDisconnect().subscribe(() => {
      connectedToInternet = false;
      this.loadingService.showAlertWithTitle("Please Connect to the Internet", "Disconnected");
    });

    network.onConnect().subscribe(() => {
      if (!connectedToInternet) {
        window.location.reload();
        this.loadingService.showAlertWithTitle("Network connected Reloading Data" + '...', "Network Connected");
        setTimeout(() => {
          if (this.network.type === 'wifi') {
            this.loadingService.showAlertWithTitle("Network connected Reloading Data" + '...', "Network Connected");
          }
        }, 3000);
      }
    });
  }

  async ngOnInit() {
    await this.storage.create();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.get("loadingFirstTime").then((val: any) => {
        //console.log("loadingFirstTime= ", val);
        if (val == null || val == false) {
          this.router.navigate(['/intro']);
        } else if (val !== null || val == true) {
          this.storage.get("isLogin").then((data: any) => {
            //console.log("isLogin in app comp=", val);
            if (data == null || data == false) {
              this.router.navigate(['/login']);
            } else if (data !== null || data == true) {

              this.apiService.callCheckUserStatusApi(this.shareData.memberDetails.UniqueId)
                .subscribe((data: any) => {
                  if (data.action == "yes") {
                    this.router.navigate(['/menu/dashboard']);
                    this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
                  } else if (data.action == "no") {
                    this.loadingService.show("InActive User Logging out")
                    setTimeout(() => {
                      this.removeFCMToken();
                      this.menuCtrl.close();
                      this.storage.remove("isLogin");
                      this.storage.remove("memberDetails");
                      this.storage.remove("subMenu");
                      this.storage.remove("userRoleUId");
                      this.storage.remove("wallet-Balance");
                      this.storage.remove("notiCount");
                      this.storage.remove("fcmToken");
                      this.storage.remove("deviceId");
                      this.storage.remove('memberDetails').then((data: any) => {
                        if (data == null) {
                          this.loadingService.hide()
                          this.storage.remove("deviceId");
                          this.router.navigateByUrl('/login', { replaceUrl: true });
                          this.shareData.isFirstTime = true;
                          this.shareData.isLogin = false;
                        }
                      })

                    }, 4000)

                  }
                })
            }
          })
        }
      })

      this.storage.get("memberDetails").then((val: any) => {
        if (val !== null) {
          this.shareData.memberDetails = val;
          // console.log("share Data  storage  memberDetails=", this.shareData.memberDetails)
        }
      })

      this.shareData.notificationCount = 0;
      this.storage.get('notiCount').then((data: any) => {
        this.shareData.notificationCount = data;
        //console.log("storage noti count", this.shareData.notificationCount);
      })

      this.storage.get("isLogin").then((val: any) => {
        if (val !== null) {
          this.shareData.isLogin = val;
          console.log(" shareddata storage login =", this.shareData.isLogin)
        } else {
          this.shareData.isLogin = false;
          console.log(" shareddata storage login =", this.shareData.isLogin)
        }
      })
      this.storage.get("userRoleUId").then((val: any) => {
        if (val !== null) {
          this.shareData.userRoleUId = val;
          //console.log("shareData userRoleUId = ", this.shareData.userRoleUId)
        }
      })

      this.storage.get("wallet-Balance").then((val: any) => {
        if (val !== null) {
          this.shareData.walletBalance = val;
          //console.log("shareData wallet-Balance = ", this.shareData.walletBalance)
        }
      })

      this.storage.get("fcmToken").then((val: any) => {
        if (val !== null) {
          this.shareData.fcmToken = val;
          //console.log("shareData fcmToken = ", this.shareData.fcmToken)
        }
      })

      this.storage.get("deviceId").then((val: any) => {
        if (val !== null) {
          this.shareData.deviceId = val;
          //console.log("shareData device id = ", this.shareData.deviceId)
        }
      })
      this.shareData.callPushNotification();
    });

  }


  removeFCMToken() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        let removeToken = {
          "UniqueId": this.shareData.memberDetails.UniqueId,
          "device_id": this.shareData.deviceId,
          "token": this.shareData.fcmToken
        }

        this.apiService.deleteFCMToken(removeToken)
          .subscribe((data: any) => {
            this.storage.remove("deviceId");
            this.shareData.isLogin = false;
            //console.log("FCM detele success", data);
          })
      }
    })
  }


}
