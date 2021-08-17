import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, MenuController, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/services/config/api.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {


  //pages: any[] = [];

  pages: any[] = [];

  isFirstTime: boolean = true;
  userRoleText: any;


  constructor(
    private platform: Platform,
    private router: Router,
    public menuCtrl: MenuController,
    private storage: Storage,
    private shareData: ShareDataService,
    public alertController: AlertController,
    private loadingService: LoadingService,
    private navController: NavController,
    private apiService: ApiService,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

  ) {

    console.log("menu fire ")
    this.initializeApp();

  }

  async ngOnInit() {
    await this.storage.create();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.get("subMenu").then((val: any) => {
        if (val !== null) {
          this.pages = val;
          this.shareData.subMenuList = val;
          //console.log("submenu list storage =", (this.shareData.subMenuList))

        }
      })
      this.storage.get("memberDetails").then((val: any) => {
        if (val !== null) {
          //console.log("share Data  storage  memberDetails=", val)
          let temp = val;
          this.userRoleText = temp.Role;
        }
      })
      setTimeout(() => {
        this.initilizeMenuList();
      }, 2000)

    });
  }


  initilizeMenuList() {
    //console.log("submenu local list storage =", (this.shareData.vinodmenu))
    //this.pages = this.shareData.vinodmenu;
    if (this.shareData.subMenuList !== null) {
      this.pages = this.shareData.subMenuList;
      //console.log("submenu api list storage =", this.pages)
    } else {
      this.storage.get("subMenu").then((val: any) => {
        if (val !== null) {
          this.pages = val;
          this.shareData.subMenuList = val;
        }
      })

    }

  }

  GotoMenu(page: any) {
    //this.router.navigate([page.url]);
    this.navController.navigateRoot([page.url]);
  }

  GotoSubMenu(sub: any) {
    //console.log("sub menu page url= ", sub)
    //this.router.navigate([sub.url[0], sub.url[1]]);
    this.navController.navigateRoot([sub.url[0], sub.url[1]]);
  }

  logOut() {
    this.menuCtrl.close();
    this.alertController.create({
      //header: 'Confirm Logout !!',
      message: 'Are You Sure You  Want to logout ??',
      backdropDismiss: false,
      cssClass: 'exitAlertCss',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Application exit prevented!');
          }
        }, {
          text: 'Yes',
          handler: () => {

            this.loadingService.show("Logging out")
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
                  this.isFirstTime = true;
                  this.shareData.isLogin = false;
                } else {
                  this.router.navigate(['/menu/dashboard'])
                  this.initilizeMenuList();
                }

              })

            }, 4000)



          }
        }]
    })
      .then(alert => {
        alert.present();
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
