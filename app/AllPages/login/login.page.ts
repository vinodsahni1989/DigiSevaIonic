import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/services/config/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';
import { Location } from '@angular/common';

import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { INotificationPayload } from 'cordova-plugin-fcm-with-dependecy-updated';
import { LocalNotifications, ILocalNotification, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  loginForm: FormGroup;
  uniqueId: any = '';
  Password: any = '';
  isSubmited = false;


  isFirstTime: boolean = true;



  public hasPermission: boolean;
  public token: string;
  public pushPayload: INotificationPayload;
  isAndroid: boolean;
  notiCount: Number = 0;

  deviceId: any = "";
  public realDeviceIdUpdatedCounter = 0;


  constructor(
    private router: Router,
    public platform: Platform,
    private fromBuilder: FormBuilder,
    private storage: Storage,
    private loadingService: LoadingService,
    private shareData: ShareDataService,
    private apiService: ApiService,
    private eventService: EventService,
    public alertController: AlertController,
    private location: Location,
    private uniqueDeviceID: UniqueDeviceID,
    private uid: Uid,
    private androidPermissions: AndroidPermissions,


    private localNotifications: LocalNotifications,
    private fcm: FCM,

  ) {

    this.storage.get("memberDetails").then((val: any) => {
      //console.log("user-Login-Details in login page =", val);
      if (val == null) {
        this.router.navigate(['/login']);
        this.isFirstTime = true;
      } else {
        this.router.navigate(['/menu/dashboard'])
      }
    })

    this.ValidateForm();

    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.getPermission();
        this.getRealDeviceId();

        // this.localNotifications.on('click').subscribe((res: any) => {
        //   let path = res.data;
        //   let subPath = path.pageUrl;
        //   console.log(JSON.stringify(subPath))
        //   this.shareData.callNotificationApi(this.shareData.memberDetails.UniqueId);
        //   this.router.navigate([subPath]);

        //   let removePushNoti = res;
        //   this.shareData.multiNoti = this.shareData.multiNoti
        //     .filter(function (e: any) {
        //       return removePushNoti.indexOf(e.value) === -1;
        //     });
        // })
        // this.localNotifications.on('trigger').subscribe((res: any) => {
        //   //let msg = res.data ? res.data.mydata : '';
        //   //alert("triger = " + res.title + res.text);
        // })
      }

      // else {
      //   this.localNotifications.on('click').subscribe((res: any) => {
      //     let path = res.data;
      //     let subPath = path.pageUrl;
      //     console.log(JSON.stringify(subPath))
      //     this.shareData.callNotificationApi(this.shareData.memberDetails.UniqueId);
      //     this.router.navigate([subPath]);

      //     let removePushNoti = res;
      //     this.shareData.multiNoti = this.shareData.multiNoti
      //       .filter(function (e: any) {
      //         return removePushNoti.indexOf(e.value) === -1;
      //       });
      //   })
      //   this.localNotifications.on('trigger').subscribe((res: any) => {
      //     //let msg = res.data ? res.data.mydata : '';
      //     //alert("triger = " + res.title + res.text);
      //   })

      // }
    })

  }


  async ngOnInit() {
    await this.storage.create();
  }


  get errorControl() {
    return this.loginForm.controls;
  }


  ValidateForm() {
    this.loginForm = this.fromBuilder.group({
      uniqueId: ['', [Validators.required]],
      password: ['', [Validators.required]],

    })
  }

  login() {
    this.isSubmited = true;
    if (!this.loginForm.valid) {
      console.log("plz provide All field")
      return false;
    } else {
      console.log(this.loginForm.value.uniqueId)
      console.log(this.loginForm.value.password)
      this.loadingService.show("Please Wait...")
      this.apiService.callCheckUserStatusApi(this.loginForm.value.uniqueId)
        .subscribe((data: any) => {
          if (data.action == "yes") {
            this.apiService.callLoginApi(this.loginForm.value.uniqueId, this.loginForm.value.password)
              .subscribe((data: any) => {
                // console.log("login response  = ", data)
                if (data.action == 'yes') {
                  this.loadingService.hide();
                  this.shareData.isLogin = true;
                  this.shareData.memberDetails = data.memberDetails;
                  this.shareData.userRoleUId = data.memberDetails.UserRoleUId;
                  this.shareData.userUniqueId = data.memberDetails.UniqueId;
                  this.shareData.callMenuList(data.memberDetails.UserRoleUId);
                  this.storage.set('memberDetails', data.memberDetails);
                  this.storage.set('isLogin', this.shareData.isLogin);
                  this.storage.set('userRoleUId', this.shareData.userRoleUId);
                  this.eventService.publish('memberDetails', data.memberDetails)
                  this.shareData.callMyWalletApi(this.shareData.userUniqueId);
                  this.shareData.callNotificationApi(this.shareData.userUniqueId);
                  //this.eventService.publish({ name: 'memberDetails', value: data.memberDetails });
                  if (this.platform.is('cordova')) {
                    this.registerPushToken();
                  }
                  this.router.navigate(['/menu/dashboard', { memberDetails: JSON.stringify(data.memberDetails) }])
                } else if (data.action == 'no') {
                  this.loadingService.hide();
                  this.loadingService.showToast(data.msg, 2000, 'danger');
                }
              })

          } else if (data.action == "no") {
            this.loadingService.hide();
            this.loadingService.showToast("User Is InActive.", 2000, 'danger');
          }
        })

    }
  }


  ionViewDidEnter() {
    // console.log("login ionViewDidEnter fire");
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      //console.log('Back press handler!');
      if (this.location.isCurrentPathEqualTo('/login')) {
        // Show Exit Alert!
        // console.log('Show Exit Alert!');
        this.showExitConfirm();
        processNextHandler();
      } else {
        // Navigate to back page
        //console.log('Navigate to back page');
        this.location.back();

      }

    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      //  console.log('Handler called to force close!');
      this.alertController.getTop().then(r => {
        if (r) {
          navigator['app'].exitApp();
        }
      }).catch(e => {
        console.log(e);
      })
    });


  }

  showExitConfirm() {
    this.alertController.create({
      header: 'Digi Seva',
      message: 'Do you want to Exit the app?',
      backdropDismiss: false,
      cssClass: 'exitAlertCss',
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }

  private async registerPushToken() {
    this.fcm.onTokenRefresh().subscribe((newToken) => {
      this.token = newToken;
      this.shareData.fcmToken = newToken;
      // console.log('onTokenRefresh received event with=>> ', this.shareData.fcmToken);
    }, ((err: any) => {

    }));
    this.hasPermission = await this.fcm.requestPushPermission();
    //console.log('requestPushPermission result: ', this.hasPermission);

    this.token = await this.fcm.getToken();
    this.shareData.fcmToken = this.token;
    //  console.log('getToken result: ', this.token);
    this.storage.set("fcmToken", this.token);

    let tokenDeviceParam = {
      "UniqueId": this.shareData.memberDetails.UniqueId,
      "device_id": this.deviceId,
      "token": this.token
    }
    this.shareData.sendFCMTokenToApi(tokenDeviceParam);

  }

  getRealDeviceId() {
    this.uniqueDeviceID.get()
      .then((uuid: any) => {
        this.deviceId = uuid;
        this.shareData.deviceId = uuid;
        this.storage.set("deviceId", this.deviceId);
        this.realDeviceIdUpdatedCounter++;
        //alert("my Device id= " + this.deviceId);
        console.log("vinod device id =", uuid.randomUUID().toString());
      })
      .catch((error: any) => {
        console.log(error)
      });
  }


  getPermission() {
    this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    ).then(res => {
      if (res.hasPermission) {

      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(res => {
          //alert("Persmission Granted Please Restart App!");
        }).catch(error => {
          //alert("Error! " + error);
        });
      }
    }).catch(error => {
      //alert("Error! " + error);
    });
  }



}
