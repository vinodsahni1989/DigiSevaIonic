import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../config/api.service';
import { EventService } from '../event/event.service';
import { LoadingService } from '../loading/loading.service';
import { StorageService } from '../storage/storage.service';


import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { INotificationPayload } from 'cordova-plugin-fcm-with-dependecy-updated';
import { LocalNotifications, ILocalNotification, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Badge } from '@ionic-native/badge/ngx';


@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  imageBaseUrl: any = 'http://digisevakendra.com/admin/uploads/';
  isLogin: boolean = false;
  memberDetails: any;
  userName: any;
  userPhoto: any;
  userRoleUId: any;
  userUniqueId: any;
  //subMneuList: any;

  subMenuList = new Array()
  roleList: any;
  sponserList: any;
  stateList: any;
  districtList: any;
  walletBalance: any;
  occupationdropDown: any;
  insufficientBalanceToast: any = 'Please add balance in your wallet<br/>फॉर्म भरने से पहले कृपया अपने वॉलेट में राशि जमा करें';



  vinodmenu: any

  notificationList: any = [];
  notificationCount: any;
  fcmToken: any;
  deviceId: any;



  hasPermission: any;
  token: any;
  pushPayload: INotificationPayload;
  isAndroid: boolean;
  notiCount: Number = 0;

  multiNoti: any = [];
  bloodGroupList: any;
  isFirstTime: boolean = true;


  constructor(
    private router: Router,
    public platform: Platform,
    private storage: Storage,
    private loadingService: LoadingService,
    private apiService: ApiService,
    private eventService: EventService,
    public alertController: AlertController,
    private storageService: StorageService,


    private localNotifications: LocalNotifications,
    private fcm: FCM,
    private badge: Badge,
    public menuCtrl: MenuController,

  ) {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.localNotifications.on('click').subscribe((res: any) => {
          if (this.isLogin == true) {
            let path = res.data;
            let subPath = path.pageUrl;
            console.log(JSON.stringify(res))
            // this.callNotificationApi(this.memberDetails.UniqueId);
            this.router.navigate([subPath]);

            let removePushNoti = res;
            this.multiNoti = this.multiNoti.filter(function (e: any) {
              return removePushNoti.indexOf(e.value) === -1;
            }, (err: any) => {

            });
          }
        })

        this.localNotifications.on('trigger').subscribe((res: any) => {
          //let msg = res.data ? res.data.mydata : '';
          //alert("triger = " + res.title + res.text);
        })
        this.localNotifications.fireQueuedEvents();

        // this.badge.requestPermission().then((res: any) => {
        //   alert("badge permisson =" + res)
        // });

        // this.badge.hasPermission().then((res) => {
        //   // Success!
        //   this.badge.set(10).then((res) => {
        //     // Success!
        //     alert("set badge= "+res);
        //   }).catch((ex) => {
        //     alert("badge err" + JSON.stringify(ex));
        //   });
        // }).catch((ex) => {
        //   alert("badge errr= " + JSON.stringify(ex));
        // });

      } else {
        this.localNotifications.on('click').subscribe((res: any) => {
          if (this.isLogin == true) {
            let path = res.data;
            let subPath = path.pageUrl;
            console.log(JSON.stringify(subPath))
            //this.callNotificationApi(this.memberDetails.UniqueId);
            this.router.navigate([subPath]);

            let removePushNoti = res;
            this.multiNoti = this.multiNoti
              .filter(function (e: any) {
                return removePushNoti.indexOf(e.value) === -1;
              });
          }

        })
        this.localNotifications.on('trigger').subscribe((res: any) => {
          //let msg = res.data ? res.data.mydata : '';
          //alert("triger = " + res.title + res.text);
        })


      }
    })

    this.vinodmenu =

      [
        {
          title: 'Dashboard',
          url: '/menu/dashboard',
          icon: 'home',
          open: false,
        },
        {
          title: 'Notification',
          url: '/menu/notification',
          icon: 'notifications-outline',
          open: false,
        },
        {
          title: 'User Management',
          icon: 'people-outline',
          children: [
            {
              title: 'Users',
              url: ['/menu/users', { screenId: "22", screenName: "Users" }],
              icon: 'person',
              open: false,
            }

          ]


        },
        {
          title: 'Online Forms',
          icon: 'newspaper-outline',
          children: [
            {
              title: 'E-District Service',
              url: ['/menu/global-online-form', { screenId: "25", screenName: "E-District Services" }],
              icon: 'megaphone-outline',
              open: false,
            },
            {
              title: 'Online Card Service',
              url: ['/menu/global-online-form', { screenId: "3", screenName: "PAN Card Services" }],
              icon: 'reader-outline',
              open: false,
            },
            {
              title: 'ARTO Service',

              url: ['/menu/global-online-form', { screenId: "2", screenName: "ARTO Services" }],
              icon: 'receipt-outline',
              open: false,
            },

            {
              title: 'Passport Seva',
              url: ['/menu/global-online-form', { screenId: "29", screenName: "Passport Seva" }],
              icon: 'receipt-outline',
              open: false,
            },
            {
              title: 'UP Govt. Scheme',
              url: ['/menu/global-online-form', { screenId: "4", screenName: "UP Govt. Scheme" }],
              icon: 'receipt-outline',
              open: false,
            },

            {
              title: 'Central Govt. Scheme',
              url: ['/menu/global-online-form', { screenId: "5", screenName: "Central Govt. Scheme" }],
              icon: 'receipt-outline',
              open: false,
            },

            {
              title: 'GST Suvidha Kendra',

              url: ['/menu/global-online-form', { screenId: "6", screenName: "GST Suvidha Kendra" }],
              icon: 'receipt-outline',
              open: false,
            },
            {
              title: 'PVC Card Services',
              url: ['/menu/global-online-form', { screenId: "7", screenName: "PVC Card Services" }], // screem id temp
              icon: 'receipt-outline',
              open: false,
            },

            {
              title: 'Shop Act License',
              url: ['/menu/global-online-form', { screenId: "9", screenName: "Shop Act License" }],
              icon: 'receipt-outline',
              open: false,
            },


            {
              title: 'Vehicle Insurance',
              url: ['/menu/global-online-form', { screenId: "12", screenName: "Vehicle Insurance" }],
              icon: 'receipt-outline',
              open: false,
            },

            {
              title: 'B2B Services',
              url: ['/menu/global-online-form', { screenId: "10", screenName: "B2B Services" }],
              icon: 'receipt-outline',
              open: false,
            },

            {
              title: 'Create PSA',
              url: ['/menu/global-online-form', { screenId: "48", screenName: "Create PSA" }],
              icon: 'receipt-outline',
              open: false,
            },
          ],

          open: false,
        },
        {
          title: 'Order Management',
          icon: 'briefcase-outline',
          children: [
            {
              title: 'All Orders',
              url: ['/menu/order-management', { screenId: "28", screenName: "All Orders" }],
              icon: 'briefcase-outline',
              open: false,
            },
            {
              title: 'Pending Orders',
              url: ['/menu/order-management', { screenId: "30", screenName: "Pending Orders" }],
              icon: 'briefcase-outline',
              open: false,
            },
            {
              title: 'Processing Orders',
              url: ['/menu/order-management', { screenId: "33", screenName: "Processing Orders" }],
              icon: 'briefcase-outline',
              open: false,
            },
            {
              title: 'Cancelled Orders',
              url: ['/menu/order-management', { screenId: "34", screenName: "Cancelled Orders" }],
              icon: 'briefcase-outline',
              open: false,
            },
            {
              title: 'Delivered Orders',
              url: ['/menu/order-management', { screenId: "42", screenName: "Delivered Orders" }],
              icon: 'briefcase-outline',
              open: false,
            }


          ],
          open: false,
        },
        {
          title: 'Download Management',
          icon: 'cloud-download-outline',
          children: [
            {
              title: 'Important Downloads',
              url: ['/menu/download-management', { screenId: "imp-download", screenName: "Important Downloads" }],
              icon: 'cloud-download-outline',
              open: false,
            },
            {
              title: 'Forms Downloads',
              url: ['/menu/download-management', { screenId: "form-download", screenName: "Forms Downloads" }],
              icon: 'cloud-download-outline',
              open: false,
            },
          ],
          open: false,
        },
        {
          title: 'Wallet Management',
          icon: 'wallet-outline',
          children: [
            {
              title: 'Wallet Balance',
              url: ['/menu/wallet-management', { screenId: "wallet-balance", screenName: "Wallet Balance" }],
              icon: 'wallet-outline',
              open: false,
            },
            {
              title: 'Wallet Request',
              url: ['/menu/wallet-management', { screenId: "wallet-request", screenName: "Wallet Request" }],
              icon: 'wallet-outline',
              open: false,
            },
            {
              title: 'Bank Details',
              url: ['/menu/wallet-management', { screenId: "bank-details", screenName: "Bank Details" }],
              icon: 'wallet-outline',
              open: false,
            },
          ],
          open: false,
        },
        {
          title: 'Digimart',
          url: '/menu/digi-mart',
          icon: 'cart-outline',
          open: false,
        },
        {
          title: 'Digimart Orders',
          url: '/menu/digimart-orders',
          icon: 'document-text-outline',
          open: false,
        },


      ]



  }


  async ngOnInit() {
    await this.storage.create();
  }

  callMenuList(userRoleId: any) {
    this.apiService.callMenuListApi(userRoleId)
      .subscribe((data: any) => {
        if (data.action == "yes") {
          this.subMenuList = data.menu;
          this.storage.set('subMenu', this.subMenuList);
          // console.log("menu api", this.subMenuList)
        } else {

        }

      })
  }

  callBloodGroupApi() {
    this.apiService.callBloodGroupApi()
      .subscribe((data: any) => {
        if (data.action == "yes") {
          this.bloodGroupList = data.bloodgroup;
          // console.log("bloodGroupList= ", this.bloodGroupList)
        }

      })

  }



  callStateGlobalApi() {
    this.apiService.callStateApi()
      .subscribe((data: any) => {
        if (data.action == "yes") {
          this.stateList = data.state;
          // console.log("state= ", this.stateList)
        }

      })

  }


  callDistrictGlobalApi(state_id: any) {
    this.apiService.callDistrictApi(state_id)
      .subscribe((data: any) => {
        if (data.action == "yes") {
          this.districtList = data.city;
          // console.log("districtList = ", this.districtList)
        }

      })
  }



  callMyWalletApi(UniqueId: any) {
    this.apiService.callwalletbalanceApi(UniqueId)
      .subscribe((data: any) => {
        if (data.action == "yes") {
          this.walletBalance = data.msg;
          this.storage.set('wallet-Balance', this.walletBalance)
          //console.log("wallet balance = ", this.walletBalance)
          //alert("wallet balance= " + this.walletBalance);
        }
      })
  }



  callOccupationGlobalApi() {
    this.apiService.callOccupationApi()
      .subscribe((data: any) => {
        if (data.action == "yes") {
          this.occupationdropDown = data.occupation;
          // console.log("occupationdropDown = ", this.occupationdropDown)
        }
      })
  }

  callNotificationApi(userUniqueId: any) {
    this.notificationCount = 0;
    this.apiService.callNotoficationListApi(userUniqueId)
      .subscribe((data: any) => {
        if (data.action == "yes") {
          this.notificationList = data.data;
          this.notificationCount = 0;
          for (var noti of this.notificationList) {
            if (noti.status == 1) {
              this.notificationCount = this.notificationCount + 1;
            }
          }
          if (this.notificationCount == null) {
            this.notificationCount = 0;
            this.eventService.publish('notiCountByEvent', this.notificationCount);
            this.storage.set("notiCount", this.notificationCount);
          } else if (this.notificationCount !== null) {
            this.storage.set("notiCount", this.notificationCount);
            this.eventService.publish('notiCountByEvent', this.notificationCount);
          }
          console.log("notifi", this.notificationList);
          console.log("notifi length", this.notificationCount);
        } else if (data.action == "no") {

        }
      })
  }

  sendFCMTokenToApi(tokenDeviceParams: any) {
    this.apiService.sendFCMTokenAndDevoceId(tokenDeviceParams)
      .subscribe((data: any) => {
        if (data.action == "yes") {
          //console.log("token send success = ", data)
        } else if (data.action == "no") {
          this.loadingService.showToast(data.msg, 2000, 'danger');
        }
      })
  }


  callPushNotification() {

    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.fcm.onTokenRefresh().subscribe((newToken) => {
          this.token = newToken;
          this.fcmToken = newToken;
          // console.log('onTokenRefresh received event with=>> ', newToken);
        }, ((err: any) => {

        }));

        this.multiNoti = [];
        this.fcm.onNotification().subscribe((payload: any) => {
          console.log("payload", payload);
          // alert("payload=" + JSON.stringify(payload))
          this.pushPayload = payload;
          let insertMulti = {
            "id": this.notiCount,
            "noti": this.pushPayload
          }
          this.multiNoti.push(insertMulti);
          this.callMyWalletApi(this.memberDetails.UniqueId);
          this.callNotificationApi(this.memberDetails.UniqueId);
          this.callLocatNotification(this.multiNoti, this.notiCount);

          //console.log('onNotification received event with: ', JSON.stringify(this.multiNoti));
          //alert("notification recive " + JSON.stringify(this.multiNoti));


          // if (payload.wasTapped == false) {
          //   alert("payload =" + JSON.stringify(payload));
          //   this.router.navigateByUrl('menu/notification');
          //   console.log("Received in background", payload.wasTapped);
          // } else {
          //   console.log("Received in foreground", payload.wasTapped);
          // }
        });

        this.hasPermission = this.fcm.requestPushPermission();
        //console.log('requestPushPermission result: ', this.hasPermission);
        this.token = this.fcm.getToken();
        //console.log('getToken result: ', this.token);
        this.fcm.getInitialPushPayload().then((res) => {
          //console.log("initial push payload =", res);
          // alert("initial push payload =" + JSON.stringify(res));
        })

      }
    })

  }

  // callLocatNotification(pushPayload: any, index: any) {
  //   this.callMyWalletApi(this.memberDetails.UniqueId);
  //   this.notiCount = Number(this.notiCount) + 1
  //   this.localNotifications.schedule({
  //     id: this.multiNoti[index].id,
  //     title: this.multiNoti[index].noti.title,
  //     text: this.multiNoti[index].noti.body,
  //     data: { pageUrl: "/menu/notification" },
  //     trigger: { at: new Date(new Date().getTime() + 100) },
  //     led: 'FF0000',
  //     foreground: true,
  //     lockscreen: true,
  //     priority: 2,
  //     vibrate: true,
  //     badge: index,
  //     launch: true,
  //     wakeup: true,

  //   })

  // }


  callLocatNotification(pushPayload: any, index: any) {
    this.callMyWalletApi(this.memberDetails.UniqueId);
    this.notiCount = Number(this.notiCount) + 1
    this.localNotifications.schedule({
      id: pushPayload[index].id,
      title: pushPayload[index].noti.title,
      text: pushPayload[index].noti.body,
      data: { pageUrl: "/menu/notification" },
      trigger: { at: new Date(new Date().getTime() + 100) },
      led: 'FF0000',
      foreground: true,
      lockscreen: true,
      priority: 2,
      vibrate: true,
      badge: index,
      launch: true,
      wakeup: true,

    })

  }


  userActiveInactive() {
    this.apiService.callCheckUserStatusApi(this.memberDetails.UniqueId)
      .subscribe((data: any) => {
        if (data.action == "yes") {
          this.router.navigate(['/menu/dashboard']);
          this.callMyWalletApi(this.memberDetails.UniqueId);
        } else if (data.action == "no") {
          this.loadingService.show("InActive User Logout...")
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
                this.isLogin = false;
              }
            })

          }, 4000)

        }
      })
  }


  removeFCMToken() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        let removeToken = {
          "UniqueId": this.memberDetails.UniqueId,
          "device_id": this.deviceId,
          "token": this.fcmToken
        }

        this.apiService.deleteFCMToken(removeToken)
          .subscribe((data: any) => {
            this.storage.remove("deviceId");
            this.isLogin = false;
            //console.log("FCM detele success", data);
          })
      }
    })
  }

}
