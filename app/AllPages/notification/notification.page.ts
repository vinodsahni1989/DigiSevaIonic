import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/config/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';
import { Storage } from '@ionic/storage-angular';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { INotificationPayload } from 'cordova-plugin-fcm-with-dependecy-updated';
import { LocalNotifications, ILocalNotification, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {


  pushes: any = [];


  public hasPermission: boolean;
  public token: string;
  public pushPayload: INotificationPayload;
  isAndroid: boolean;

  dynamiPath: any;



  constructor(
    private router: Router,
    public platform: Platform,
    private apiService: ApiService,
    private storage: Storage,
    private eventService: EventService,
    private activatedroute: ActivatedRoute,
    private shareData: ShareDataService,
    private loadingService: LoadingService,
    public actionCtrl: ActionSheetController,

    private localNotifications: LocalNotifications,
    private fcm: FCM,

  ) {
    this.loadingService.autoHide(200, "Loading...");
    this.shareData.callNotificationApi(this.shareData.memberDetails.UniqueId)
  }

  async ngOnInit() {
    await this.storage.create();
  }


  goToRelatedpage(notiItem: any) {
    console.log("notiItem =", notiItem);
    if (this.shareData.isLogin == true) {
      this.apiService.callReadNotoficationListApi(notiItem.id)
        .subscribe((data: any) => {
          if (data.action == "yes") {
            this.shareData.callNotificationApi(this.shareData.memberDetails.UniqueId);
            this.dynamiPath = JSON.parse(notiItem.screen_id);
            //console.log("dynamic nav path=", this.dynamiPath);
            this.router.navigate([this.dynamiPath[0].url, { screenId: this.dynamiPath[0].screenId, screenName: this.dynamiPath[0].screenName }]);
            // this.router.navigate(['/menu/order-management', { screenId: "28", screenName: "All Orders" }]);
          } else if (data.action == "no") {

          }
        })
    }

  }

  registerDevice(registrationId: any) {
    let data: { [k: string]: any } = {};
    if (this.shareData.memberDetails.UniqueId == null) {
      data.UniqueId = null;
    }
    else {
      data.UniqueId = this.shareData.memberDetails.UniqueId;
    }

  }

}

