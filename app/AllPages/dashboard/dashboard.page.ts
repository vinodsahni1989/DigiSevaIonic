import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/services/config/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  imageBaseUrl: any = 'http://digisevakendra.com/admin/uploads/';
  memberDetails: any = '';


  name: any;
  joinDate: any;
  ID: any;
  DOB: any;
  fathersName: any;
  phone: any;
  email: any;
  phone2: any;
  aadharCard: any;
  panCard: any;
  shopName: any;
  education: any;
  address: any;
  state: any;
  district: any;
  panImage: any;
  aadharImage: any;

  backButtonSubs: any;





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
    private activatedroute: ActivatedRoute,


  ) {
    this.callEvent();
    // let member_Details = this.activatedroute.snapshot.paramMap.get('memberDetails')
    // if (member_Details !== null) {
    //   this.memberDetails = JSON.parse(member_Details)
    //   console.log("memberDetails in dash page navctrl =", this.memberDetails);
    // }


  }


  async ngOnInit() {
    await this.storage.create();

  }

  //for disable back button
  ionViewDidEnter() {
    this.callStorage();
    this.backButtonSubs = this.platform.backButton.subscribeWithPriority(9999, () => {
      // console.log("subscription= ", this.backButtonSubs)
      let a = 0;
      this.platform.backButton.subscribe(() => {
        a++;
        if (a == 2) { // logic for double tap
          navigator['app'].exitApp();
        }
      });


      this.alertController.create({
        message: 'Do you want to Exit app?',
        backdropDismiss: false,
        cssClass: 'exitAlertCss',
        buttons: [{
          text: 'No',
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
    })

  }



  ionViewWillLeave() {
    this.backButtonSubs.unsubscribe();
  }
  //for disable back button end
  callEvent() {
    this.eventService.subscribe('memberDetails', ((data: any) => {
      if (data !== null) {
        this.memberDetails = data;
        this.shareData.userName = this.memberDetails.MemberName;
        // console.log("member data event=", this.memberDetails)
      } else if (data == null) {
        // console.log("member data event=", null)
      }

    }))
    // this.shareData.notificationCount = 0;
    // this.eventService.subscribe('notiCountByEvent', ((data: any) => {
    //   if (data !== null) {
    //     this.shareData.notificationCount = data;
    //     console.log("notificationCount event=", this.shareData.notificationCount);
    //   } else if (data == null) {
    //   }

    // }))

    // this.eventService.currentEvent.subscribe((data: any) => {
    //   if (data !== null) {
    //     this.memberDetails = data.value;
    //     this.shareData.userName = this.memberDetails.MemberName;
    //     console.log("member data event=", this.memberDetails)
    //   } else if (data == null) {
    //     //console.log("member data event=", null)
    //   }
    // });
  }

  callStorage() {
    this.storage.get('memberDetails').then((data: any) => {
      if (data !== null) {
        this.memberDetails = data;
        this.shareData.userName = this.memberDetails.MemberName;
        this.shareData.userPhoto = this.memberDetails.Photo;
        // console.log("member data storage =", this.memberDetails)
        this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
      } else if (data == null) {
        //console.log("member data storage =", null)

      }
      this.shareData.notificationCount = 0;
      this.storage.get('notiCount').then((data: any) => {
        this.shareData.notificationCount = data;
        //console.log("storage noti count", this.shareData.notificationCount);
      })

    })



  }

  goToNotificationPage() {
    this.router.navigate(['/menu/notification']);
  }








}
