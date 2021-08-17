import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/config/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';


import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { INotificationPayload } from 'cordova-plugin-fcm-with-dependecy-updated';
import { LocalNotifications, ILocalNotification, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-add-wallet-request',
  templateUrl: './add-wallet-request.page.html',
  styleUrls: ['./add-wallet-request.page.scss'],
})
export class AddWalletRequestPage implements OnInit {

  statusHeader: any = {
    header: 'Select User',
  };

  statusHeader2: any = {
    header: 'Select Status',
  };
  addWalletRequestForm: FormGroup;
  isSubmited = false;
  uniqueId: any = '';
  amountTopup: any = '';
  txnDetail: any = '';
  otherDetail: any = '';

  permissionsManagementForm: FormGroup
  isSubmited2 = false;
  screenName: any = '';
  status: any = '';




  public hasPermission: boolean;
  public token: string;
  public pushPayload: INotificationPayload;
  isAndroid: boolean;
  notiCount: Number = 0;

  constructor(
    private router: Router,
    public platform: Platform,
    private loadingService: LoadingService,
    private shareData: ShareDataService,
    private apiService: ApiService,
    private eventService: EventService,
    public alertController: AlertController,
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,

    private localNotifications: LocalNotifications,
    private fcm: FCM,
  ) {

    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.localNotifications.on('click').subscribe((res: any) => {
          let path = res.data;
          let subPath = path.pageUrl;
          console.log(JSON.stringify(subPath))
          this.router.navigate([subPath]);

          let removePushNoti = res;
          this.shareData.multiNoti = this.shareData.multiNoti
            .filter(function (e: any) {
              return removePushNoti.indexOf(e.value) === -1;
            });


        })
        this.localNotifications.on('trigger').subscribe((res: any) => {
          //let msg = res.data ? res.data.mydata : '';
          //alert("triger = " + res.title + res.text);
        })
      } else {
        this.localNotifications.on('click').subscribe((res: any) => {
          let path = res.data;
          let subPath = path.pageUrl;
          console.log(JSON.stringify(subPath))
          this.router.navigate([subPath]);
        })
        this.localNotifications.on('trigger').subscribe((res: any) => {
          //let msg = res.data ? res.data.mydata : '';
          //alert("triger = " + res.title + res.text);
        })

      }
    })




  }

  ngOnInit() {
    this.ValidateWalletRequestForm();
    this.ValidatePermissionForm();
  }

  ValidateWalletRequestForm(): void {
    this.addWalletRequestForm = this.formBuilder.group(
      {
        uniqueId: ['', [Validators.required]],
        amountTopup: ['', [Validators.required]],
        txnDetail: ['', [Validators.required]],
        otherDetail: ['',],

      });

  }

  get errorControl() {
    return this.addWalletRequestForm.controls;

  }

  addWalletRequest() {
    this.isSubmited = true;
    if (!this.addWalletRequestForm.valid) {
      //console.log(" User update Invalid")
      return false;
    }
    else {
      this.loadingService.show("Requesting...");
      this.apiService.callAddwalletRequestApi(this.addWalletRequestForm.value.amountTopup,
        this.addWalletRequestForm.value.uniqueId, this.addWalletRequestForm.value.txnDetail,
        this.addWalletRequestForm.value.otherDetail)
        .subscribe((data: any) => {
          if (data.action == "yes") {
            this.loadingService.hide();
            //console.log("add request ", data)
            this.loadingService.showToast(data.msg, 1000, "success");
            const paramData: any = {
              screenId: "39",
              screenName: "Wallet Request"
            }
            setTimeout(() => {
              this.router.navigate(['/menu/wallet-management', paramData]);
            }, 2000)
          } else if (data.action == "no") {
            this.loadingService.hide();
            //console.log("add request fail", data)
            this.loadingService.showToast(data.msg, 1000, "danger");
          }



        })
    }

  }


  ValidatePermissionForm(): void {
    this.permissionsManagementForm = this.formBuilder.group(
      {
        screenName: ['', [Validators.required]],
        status: ['', [Validators.required]],
      });

  }

  get errorControl2() {
    return this.permissionsManagementForm.controls;

  }


  addNewPermission() {
    this.isSubmited2 = true;
    if (!this.permissionsManagementForm.valid) {
      //console.log(" User update Invalid")
      return false;
    }
    else {
      //console.log("screen name ", this.permissionsManagementForm.value.screenName)
      //console.log("selected status  ", this.permissionsManagementForm.value.status)
    }

  }
}